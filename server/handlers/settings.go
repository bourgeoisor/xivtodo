package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"server/models"
	"server/store"
	"server/utils"
)

func SettingsHandler() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		if utils.ValidateMethodOrFail(w, r, http.MethodPut) != nil {
			return
		}

		userData := models.User{}
		if utils.GetUserWithAuthnOrFail(w, r, &userData) != nil {
			return
		}

		// @TODO validate settings changed before updating
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&userData.Settings)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("failed to decode settings: %v", err)
			return
		}

		_, err = store.Client.Collection("users").Doc(userData.DiscordUser.ID).Set(store.Ctx, userData)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("failed to store User data: %v", err)
			return
		}

		w.WriteHeader(http.StatusOK)
		err = json.NewEncoder(w).Encode(userData.Settings)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("failed to send settings data: %v", err)
			return
		}
	}
	return http.HandlerFunc(fn)
}
