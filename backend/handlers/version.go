package handlers

import (
	"fmt"
	"log"
	"net/http"
	"server/utils"
)

func VersionHandler() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		if utils.ValidateMethodOrFail(w, r, http.MethodGet) != nil {
			return
		}

		w.WriteHeader(http.StatusOK)
		_, err := fmt.Fprintf(w, `{"version": "foobar1"}`)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("failed to send version details: %v", err)
			return
		}
	}
	return http.HandlerFunc(fn)
}
