package handlers

import (
	"bytes"
	"crypto/sha1"
	"encoding/base64"
	"encoding/binary"
	"encoding/json"
	"errors"
	"log"
	"math/rand"
	"net/http"
	"net/url"
	"os"
	"server/models"
	"server/store"
	"server/utils"
	"strconv"
	"time"
)

const (
	discordClientID    = "933567168912719923"
	discordAPIEndpoint = "https://discord.com/api/v8"
)

var (
	discordClientSecret string
	discordRedirectUri  string
)

func init() {
	discordRedirectUri = os.Getenv("DISCORD_REDIRECT_URI")
	if discordRedirectUri == "" {
		log.Fatalln("fatal: The DISCORD_REDIRECT_URI env is not set")
	}

	discordClientSecret = os.Getenv("DISCORD_CLIENT_SECRET")
	if discordRedirectUri == "" {
		log.Fatalln("fatal: The DISCORD_CLIENT_SECRET env is not set")
	}
}

func AuthHandler() http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		if utils.ValidateMethodOrFail(w, r, http.MethodGet) != nil {
			return
		}

		code := r.URL.Query().Get("code")

		discordAuthResponse := models.DiscordAuthResponse{}
		err := getDiscordAuthResponse(&discordAuthResponse, code)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
			log.Printf("Failed to get DiscordAuthResponse: %v", err)
			return
		}

		discordUser := models.DiscordUser{}
		err = getDiscordUserResponse(&discordUser, &discordAuthResponse)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("Failed to get DiscordUser: %v", err)
			return
		}

		userData := models.User{}
		err = getUserDataOrDefault(&userData, &discordUser)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("Failed to get User data: %v", err)
			return
		}

		_, err = store.Client.Collection("users").Doc(discordUser.ID).Set(store.Ctx, userData)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			log.Printf("Failed to store User data: %v", err)
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

func getDiscordAuthResponse(discordAuthResponse *models.DiscordAuthResponse, code string) error {
	values := url.Values{
		"client_id":     {discordClientID},
		"client_secret": {discordClientSecret},
		"grant_type":    {"authorization_code"},
		"code":          {code},
		"redirect_uri":  {discordRedirectUri},
	}

	resp, err := http.Post(discordAPIEndpoint+"/oauth2/token", "application/x-www-form-urlencoded", bytes.NewBufferString(values.Encode()))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	err = json.NewDecoder(resp.Body).Decode(discordAuthResponse)
	if err != nil {
		return err
	}

	return nil
}

func getDiscordUserResponse(discordUser *models.DiscordUser, discordAuthResponse *models.DiscordAuthResponse) error {
	client := &http.Client{
		Timeout: time.Second * 10,
	}

	req, err := http.NewRequest("GET", discordAPIEndpoint+"/users/@me", nil)
	req.Header.Add("Authorization", discordAuthResponse.TokenType+" "+discordAuthResponse.AccessToken)
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return errors.New(resp.Status)
	}

	err = json.NewDecoder(resp.Body).Decode(discordUser)
	if err != nil {
		return err
	}

	return nil
}

func getUserDataOrDefault(userData *models.User, discordUser *models.DiscordUser) error {
	user, err := store.Client.Collection("users").Doc(discordUser.ID).Get(store.Ctx)
	if err != nil && (user == nil || user.Exists()) {
		return err
	}

	if user.Exists() {
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
	}

	userData.DiscordUser = discordUser
	if userData.Settings == nil {
		authorizationHash := sha1.New()
		authorizationHash.Write([]byte(discordUser.ID))
		authorizationHash.Write([]byte(strconv.FormatInt(time.Now().Unix(), 10)))
		authorizationCode := base64.URLEncoding.EncodeToString(authorizationHash.Sum(nil))

		characterClaimCodeBytes := make([]byte, 8)
		binary.LittleEndian.PutUint64(characterClaimCodeBytes, rand.Uint64())
		characterClaimCode := base64.StdEncoding.EncodeToString(characterClaimCodeBytes)

		userData.Settings = &models.Settings{
			AuthorizationCode:  authorizationCode,
			CharacterClaimCode: characterClaimCode,
		}
	}

	return nil
}
