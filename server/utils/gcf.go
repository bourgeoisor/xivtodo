package utils

import (
	"encoding/json"
	"net/http"
	"server/models"
	"strconv"
)

func GetLodestoneProfile(characterID string, basic bool) (*models.LodestoneProfile, error) {
	resp, err := http.Get("https://asia-northeast1-xiv-todo.cloudfunctions.net/lodestone-character?" +
		"id=" + characterID + "&basic=" + strconv.FormatBool(basic))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	lodestoneProfile := &models.LodestoneProfile{}
	err = json.NewDecoder(resp.Body).Decode(lodestoneProfile)
	return lodestoneProfile, err
}
