package main

import (
	"log"
	"net/http"
	"os"
	"server/handlers"
	"server/utils"
	"strings"
)

func withHeaders(handler http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")

		if r.Method == http.MethodOptions {
			w.Header().Set("Access-Control-Allow-Methods", "GET, PUT, DELETE")
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
	mux.Handle("/version", withHeaders(withRateLimit(handlers.VersionHandler())))
	mux.Handle("/auth", withHeaders(withRateLimit(handlers.AuthHandler())))
	mux.Handle("/users", withHeaders(withRateLimit(handlers.UsersHandler())))
	mux.Handle("/characters", withHeaders(withRateLimit(handlers.CharactersHandler())))
	mux.Handle("/settings", withHeaders(withRateLimit(handlers.SettingsHandler())))
	mux.Handle("/encounters", withHeaders(withRateLimit(handlers.EncountersHandler())))
	mux.Handle("/checklist", withHeaders(withRateLimit(handlers.ChecklistHandler())))

	port := os.Getenv("PORT")
	if port != "" {
		port = ":" + port
	} else {
		port = "localhost:8181"
	}

	log.Println("listening to", port)
	log.Fatal(http.ListenAndServe(port, mux))
}
