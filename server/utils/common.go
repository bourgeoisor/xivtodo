package utils

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"server/models"
	"server/store"
	"strings"
)

func ValidateMethodOrFail(w http.ResponseWriter, r *http.Request, methods ...string) error {
	for _, method := range methods {
		if r.Method == method {
			return nil
		}
	}

	http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
	log.Printf("MethodNotAllowed: %s", r.Method)
	return errors.New("invalid method: " + r.Method)
}

func GetUserWithAuthnOrFail(w http.ResponseWriter, r *http.Request, userData *models.User) error {
	authorization := strings.Split(r.Header.Get("Authorization"), ":")
	if len(authorization) != 2 {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		log.Println("invalid Authorization header")
		return errors.New("invalid Authorization header")
	}

	discordID := authorization[0]
	authorizationCode := authorization[1]

	user, err := store.Client.Collection("users").Doc(discordID).Get(store.Ctx)
	if err != nil || !user.Exists() {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		log.Println(err)
		return err
	}

	m := user.Data()
	jsonBody, err := json.Marshal(m)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		log.Println(err)
		return err
	}
	if err := json.Unmarshal(jsonBody, userData); err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		log.Println(err)
		return err
	}

	// @TODO: figure out why this is not working
	//err = user.DataTo(&userData)
	//if err != nil {
	//	return err
	//}

	if userData.Settings.AuthorizationCode != authorizationCode {
		http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
		log.Println("invalid Authorization code")
		return errors.New("invalid authorization code")
	}

	return nil
}

func CharacterInUser(userData *models.User, id string) bool {
	_, exists := userData.Characters[id]
	return exists
}
