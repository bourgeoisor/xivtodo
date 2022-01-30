package handlers

import "net/http"

func SettingsHandler() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		// @TODO: write setting
		// @TODO: handle adding new characters?
		// @TODO: change "last modified" (or automatic?)
	}
	return http.HandlerFunc(fn)
}
