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
	if userHasMaxCharacters(userData) || characterIsInUser(userData, characterID) {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		log.Println("user has 16 characters or character already in user")
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
	}
	userData.Characters = append(userData.Characters, &character)

	_, err = store.Client.Collection("users").Doc(userData.DiscordUser.ID).Set(store.Ctx, userData)
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
	if !characterIsInUser(userData, characterID) {
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
	return len(userData.Characters) > 16
}

func characterIsInUser(userData *models.User, id string) bool {
	for _, v := range userData.Characters {
		if strconv.Itoa(int(v.LodestoneData.Character.ID)) == id {
			return true
		}
	}

	return false
}
