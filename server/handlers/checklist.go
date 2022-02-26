package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"server/models"
	"server/store"
	"server/utils"
)

func ChecklistHandler() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		if utils.ValidateMethodOrFail(w, r, http.MethodPut) != nil {
			return
		}

		userData := models.User{}
		if utils.GetUserWithAuthnOrFail(w, r, &userData) != nil {
			return
		}

		characterID := r.URL.Query().Get("id")
		if characterID == "" {
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			log.Println("missing id query")
			return
		}
		characterIndex := utils.CharacterIndexInUser(&userData, characterID)

		checklistData := models.ChecklistData{}
		err := json.NewDecoder(r.Body).Decode(&checklistData)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("failed to decode checklistData: %v", err)
			return
		}

		userData.Characters[characterIndex].ChecklistData = &checklistData

		_, err = store.Client.Collection("users").Doc(userData.DiscordUser.ID).Set(store.Ctx, userData)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("failed to store User data: %v", err)
			return
		}

		w.WriteHeader(http.StatusOK)
		err = json.NewEncoder(w).Encode(checklistData)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("failed to send checklistData: %v", err)
			return
		}
	}
	return http.HandlerFunc(fn)
}
