package handlers

import (
	"encoding/json"
	"errors"
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

		settings := models.Settings{}
		err := json.NewDecoder(r.Body).Decode(&settings)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("failed to decode settings: %v", err)
			return
		}

		err = validateSettings(&userData, &settings)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			log.Printf("requested settings invalid: %v", err)
			return
		}

		userData.Settings = &settings

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

func validateSettings(userData *models.User, payload *models.Settings) error {
	if payload.AuthorizationCode != userData.Settings.AuthorizationCode {
		return errors.New("AuthorizationCode is immutable")
	}

	if payload.CharacterClaimCode != userData.Settings.CharacterClaimCode {
		return errors.New("CharacterClaimCode is immutable")
	}

	return nil
}