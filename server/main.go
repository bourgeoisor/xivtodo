package main

import (
	"log"
	"net/http"
	"server/handlers"
	"server/utils"
	"strings"
)

const listenTo = "localhost:8181"

func withHeaders(handler http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		if r.Method == http.MethodOptions {
			w.Header().Set("Access-Control-Allow-Methods", "GET, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			w.Header().Set("Access-Control-Max-Age", "3600")
			w.WriteHeader(http.StatusNoContent)
			return
		}

		handler.ServeHTTP(w, r)
	}
	return http.HandlerFunc(fn)
}

func withRateLimit(handler http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		remoteHost := r.Header.Get("X-REAL-IP")
		if remoteHost == "" {
			remoteHost = r.Header.Get("X-FORWARDED-FOR")
		}
		if remoteHost == "" {
			remoteHost = r.RemoteAddr
		}
		remoteHost = strings.Split(remoteHost, ":")[0]

		log.Println(remoteHost, "-->", r.Method, r.RequestURI)

		ok := utils.RateLimiter.Log(remoteHost)
		if !ok {
			http.Error(w, http.StatusText(http.StatusTooManyRequests), http.StatusTooManyRequests)
			log.Printf("TooManyRequests: %s", remoteHost)
			return
		}

		handler.ServeHTTP(w, r)
	}
	return http.HandlerFunc(fn)
}

func main() {
	mux := http.NewServeMux()
	mux.Handle("/auth", withHeaders(withRateLimit(handlers.AuthHandler())))
	mux.Handle("/users", withHeaders(withRateLimit(handlers.UsersHandler())))
	mux.Handle("/characters/add", withHeaders(withRateLimit(handlers.AddCharacterHandler())))
	mux.Handle("/characters/remove", withHeaders(withRateLimit(handlers.RemoveCharacterHandler())))
	mux.Handle("/settings", withHeaders(withRateLimit(handlers.SettingsHandler())))
	mux.Handle("/encounters", withHeaders(withRateLimit(handlers.EncountersHandler())))
	mux.Handle("/checklist", withHeaders(withRateLimit(handlers.ChecklistHandler())))

	log.Println("Listening to", listenTo)
	log.Fatal(http.ListenAndServe(listenTo, mux))
}
