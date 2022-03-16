package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"server/models"
	"server/utils"
)

func UsersHandler() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		if utils.ValidateMethodOrFail(w, r, http.MethodGet) != nil {
			return
		}

		// @TODO: only fetch if not cached

		userData := models.User{}
		if utils.GetUserWithAuthnOrFail(w, r, &userData) != nil {
			return
		}

		// @TODO: return "unchanged" if unchanged

		w.WriteHeader(http.StatusOK)
		err := json.NewEncoder(w).Encode(userData)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("Failed to send User data: %v", err)
			return
		}
	}
	return http.HandlerFunc(fn)
}
