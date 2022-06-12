package utils

import (
	"encoding/json"
	"errors"
	"net/http"
	"server/models"
	"strconv"
)

func GetLodestoneProfile(w http.ResponseWriter, characterID string, basic bool) (*models.LodestoneProfile, error) {
	resp, err := http.Get("https://asia-northeast1-xiv-todo.cloudfunctions.net/lodestone-character?" +
		"id=" + characterID + "&basic=" + strconv.FormatBool(basic))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusServiceUnavailable {
		http.Error(w, http.StatusText(http.StatusServiceUnavailable), http.StatusServiceUnavailable)
		return nil, errors.New(http.StatusText(http.StatusServiceUnavailable))
	} else if resp.StatusCode == http.StatusNotFound {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		return nil, errors.New(http.StatusText(http.StatusNotFound))
	}

	lodestoneProfile := &models.LodestoneProfile{}
	err = json.NewDecoder(resp.Body).Decode(lodestoneProfile)
	return lodestoneProfile, err
}
