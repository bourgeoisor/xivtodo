package lodestone

import (
	"encoding/json"
	"fmt"
	"github.com/xivapi/godestone/v2"
	"log"
	"net/http"
	"strconv"
)

type CharacterResponse struct {
	Achievements       []*godestone.AchievementInfo
	AllAchievementInfo *godestone.AllAchievementInfo
	Character          *godestone.Character
	Minions            []*godestone.Minion
	Mounts             []*godestone.Mount
}

func LodestoneCharacter(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	if r.Method == http.MethodOptions {
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Max-Age", "3600")
		w.WriteHeader(http.StatusNoContent)
		return
	}

	id, err := strconv.ParseUint(r.URL.Query().Get("id"), 10, 32)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
		log.Fatalln(err)
	}

	characterResponse := CharacterResponse{}

	character, err := scraper.FetchCharacter(uint32(id))
	if err != nil {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
		log.Fatalln(err)
	}
	characterResponse.Character = character

	achievements, allAchievementsInfo, err := scraper.FetchCharacterAchievements(uint32(id))
	if err == nil {
		characterResponse.Achievements = achievements
		characterResponse.AllAchievementInfo = allAchievementsInfo
	}

	minions, err := scraper.FetchCharacterMinions(uint32(id))
	if err == nil {
		characterResponse.Minions = minions
	}

	mounts, err := scraper.FetchCharacterMounts(uint32(id))
	if err == nil {
		characterResponse.Mounts = mounts
	}

	cJSON, err := json.Marshal(characterResponse)
	if err != nil {
		log.Fatalln(err)
	}

	fmt.Fprint(w, string(cJSON))
}
