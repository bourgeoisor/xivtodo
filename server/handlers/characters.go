package handlers

import (
	"cloud.google.com/go/firestore"
	"encoding/json"
	"log"
	"net/http"
	"server/models"
	"server/store"
	"server/utils"
	"time"
)

func CharactersHandler() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		if utils.ValidateMethodOrFail(w, r, http.MethodGet, http.MethodDelete) != nil {
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

		switch r.Method {
		case http.MethodGet:
			addCharacter(w, &userData, characterID)
		case http.MethodDelete:
			removeCharacter(w, &userData, characterID)
		}
	}
	return http.HandlerFunc(fn)
}

func addCharacter(w http.ResponseWriter, userData *models.User, characterID string) {
	if userHasMaxCharacters(userData) && !utils.CharacterInUser(userData, characterID) {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		log.Println("user already has 8 characters")
		return
	}

	lodestoneProfile, err := utils.GetLodestoneProfile(characterID, false)
	if err != nil {
		// @TODO: handle 404 vs. Lodestone maintenance
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		log.Printf("failed to get Lodestone data: %v", err)
		return
	}

	character := models.Character{
		Updated:       time.Now().Unix(),
		LodestoneData: lodestoneProfile,
		ChecklistData: &models.ChecklistData{
			WeeklyChecklist: []*models.ChecklistItem{},
			DailyChecklist:  []*models.ChecklistItem{},
			AdhocChecklist:  []*models.ChecklistItem{},
		},
	}
	if utils.CharacterInUser(userData, characterID) {
		character = *userData.Characters[characterID]
		character.Updated = time.Now().Unix()
		character.LodestoneData = lodestoneProfile
	}

	_, err = store.Client.Collection("users").Doc(userData.DiscordUser.ID).Set(store.Ctx, map[string]interface{}{
		"Characters": map[string]interface{}{
			characterID: character,
		},
	}, firestore.MergeAll)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		log.Printf("failed to store User data: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(character)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		log.Printf("failed to send Character data: %v", err)
		return
	}
}

func removeCharacter(w http.ResponseWriter, userData *models.User, characterID string) {
	if !utils.CharacterInUser(userData, characterID) {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		log.Println("character is not in user")
		return
	}

	_, err := store.Client.Collection("users").Doc(userData.DiscordUser.ID).Update(store.Ctx, []firestore.Update{
		{
			Path:  "Characters." + characterID,
			Value: firestore.Delete,
		},
	})

	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		log.Printf("Failed to store User data: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func userHasMaxCharacters(userData *models.User) bool {
	return len(userData.Characters) > 8
}
