package handlers

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"server/models"
	"server/store"
	"server/utils"
	"strconv"
	"strings"
	"time"
)

func AddCharacterHandler() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
			log.Printf("MethodNotAllowed: %s", r.Method)
			return
		}

		id := r.URL.Query().Get("id")
		authorization := strings.Split(r.Header.Get("Authorization"), ":")
		if id == "" || len(authorization) != 2 {
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			log.Println("Invalid id query or Authorization header")
			return
		}

		discordID := authorization[0]
		authorizationCode := authorization[1]

		userData := models.User{}
		err := getUserDataAndAuthn(&userData, discordID, authorizationCode)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("Failed to get User data: %v", err)
			return
		}

		if userHasMaxCharacters(&userData) || characterIsInUser(&userData, id) {
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			log.Println("User has 16 characters or character already in user")
			return
		}

		lodestoneProfile, err := utils.GetLodestoneProfile(id, false)
		if err != nil {
			// @TODO: handle 404 vs. Lodestone maintenance
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
			log.Printf("Failed to get Lodestone data: %v", err)
			return
		}

		character := models.Character{
			Updated:       time.Now().Unix(),
			LodestoneData: lodestoneProfile,
		}
		userData.Characters = append(userData.Characters, &character)

		_, err = store.Client.Collection("users").Doc(discordID).Set(store.Ctx, userData)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("Failed to store User data: %v", err)
			return
		}

		w.WriteHeader(http.StatusOK)
		err = json.NewEncoder(w).Encode(character)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("Failed to send Character data: %v", err)
			return
		}
	}
	return http.HandlerFunc(fn)
}

func RemoveCharacterHandler() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodDelete {
			http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
			log.Printf("MethodNotAllowed: %s", r.Method)
			return
		}

		id := r.URL.Query().Get("id")
		authorization := strings.Split(r.Header.Get("Authorization"), ":")
		if id == "" || len(authorization) != 2 {
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			return
		}

		discordID := authorization[0]
		authorizationCode := authorization[1]

		userData := models.User{}
		err := getUserDataAndAuthn(&userData, discordID, authorizationCode)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("Failed to get User data: %v", err)
			return
		}

		for i, v := range userData.Characters {
			if strconv.Itoa(int(v.LodestoneData.Character.ID)) == id {
				userData.Characters = append(userData.Characters[:i], userData.Characters[i+1:]...)
			}
		}

		_, err = store.Client.Collection("users").Doc(discordID).Set(store.Ctx, userData)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("Failed to store User data: %v", err)
			return
		}

		w.WriteHeader(http.StatusOK)
	}
	return http.HandlerFunc(fn)
}

func getUserDataAndAuthn(userData *models.User, id, authorizationCode string) error {
	user, err := store.Client.Collection("users").Doc(id).Get(store.Ctx)
	if err != nil || !user.Exists() {
		return err
	}

	m := user.Data()
	jsonbody, err := json.Marshal(m)
	if err != nil {
		return err
	}
	if err := json.Unmarshal(jsonbody, userData); err != nil {
		return err
	}

	// @TODO: figure out why this is not working
	//err = user.DataTo(&userData)
	//if err != nil {
	//	return err
	//}

	if userData.Settings.AuthorizationCode != authorizationCode {
		return errors.New("invalid authorization code")
	}

	return nil
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
