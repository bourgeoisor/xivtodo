package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"server/models"
	"server/store"
	"server/utils"
)

func UsersHandler() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		// @TODO: origin-protect Function
		// @TODO: minimize reads and writes to db
		// @TODO: only send data if changed
		// @TODO: think about scaled up backend
		// @TODO: reset checklist / etc when reset happens
		// @TODO: verify auth code
		// @TODO: "updated" on user, only send full user if a) character list changed

		if utils.ValidateMethodOrFail(w, r, http.MethodGet) != nil {
			return
		}

		id := "123"

		user, err := store.Client.Collection("users").Doc(id).Get(store.Ctx)
		if err != nil || !user.Exists() {
			http.Error(w, http.StatusText(http.StatusNotFound), http.StatusInternalServerError)
			log.Printf("Failed to send User data: %v", err)
			return
		}

		userData := models.User{}
		err = user.DataTo(&userData)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("Failed to send User data: %v", err)
			return
		}

		w.WriteHeader(http.StatusOK)
		err = json.NewEncoder(w).Encode(userData)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("Failed to send User data: %v", err)
			return
		}
	}
	return http.HandlerFunc(fn)
}
