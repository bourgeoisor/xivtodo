package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"server/models"
	"server/store"
	"server/utils"
	"strconv"
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
	characterIndex := utils.CharacterIndexInUser(userData, characterID)
	if userHasMaxCharacters(userData) && characterIndex == -1 {
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

	if characterIndex == -1 {
		character := models.Character{
			Updated:       time.Now().Unix(),
			LodestoneData: lodestoneProfile,
			ChecklistData: &models.ChecklistData{
				WeeklyChecklist: []*models.ChecklistItem{},
				DailyChecklist:  []*models.ChecklistItem{},
				AdhocChecklist:  []*models.ChecklistItem{},
			},
		}
		userData.Characters = append(userData.Characters, &character)
		characterIndex = len(userData.Characters) - 1
	} else {
		userData.Characters[characterIndex].Updated = time.Now().Unix()
		userData.Characters[characterIndex].LodestoneData = lodestoneProfile
	}

	_, err = store.Client.Collection("users").Doc(userData.DiscordUser.ID).Set(store.Ctx, userData)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		log.Printf("failed to store User data: %v", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(userData.Characters[characterIndex])
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		log.Printf("failed to send Character data: %v", err)
		return
	}
}

func removeCharacter(w http.ResponseWriter, userData *models.User, characterID string) {
	if utils.CharacterIndexInUser(userData, characterID) == -1 {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		log.Println("character is not in user")
		return
	}

	for i, v := range userData.Characters {
		if strconv.Itoa(int(v.LodestoneData.Character.ID)) == characterID {
			userData.Characters = append(userData.Characters[:i], userData.Characters[i+1:]...)
		}
	}

	_, err := store.Client.Collection("users").Doc(userData.DiscordUser.ID).Set(store.Ctx, userData)
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
