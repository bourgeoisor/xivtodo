package handlers

import "net/http"

func ChecklistHandler() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		// @TODO: write checklist clear
		// @TODO: change "last modified" (or automatic?)
	}
	return http.HandlerFunc(fn)
}
