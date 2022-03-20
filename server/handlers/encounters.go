package handlers

import "net/http"

func EncountersHandler() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {

	}
	return http.HandlerFunc(fn)
}
