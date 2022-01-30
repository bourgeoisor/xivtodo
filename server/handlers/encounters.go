package handlers

import "net/http"

func EncountersHandler() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		// @TODO: write encounter clear
		// @TODO: change "last modified" (or automatic?)
	}
	return http.HandlerFunc(fn)
}
