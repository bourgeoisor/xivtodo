<template>
  <div class="container">
    <h1>Settings</h1>
    <Alert v-if="error" :msg="error" />
    <hr />
    <form name="settings-form" id="settings-form">
      <div class="row">
        <div class="col-md-6">
          <h2>General</h2>
          <h3>Content spoilers</h3>
          <div class="form-check">
            <input
              v-model="settings.spoilersOption"
              class="form-check-input"
              type="radio"
              name="inputSpoilersOption"
              id="inputSpoilersOption0"
              value="0"
            />
            <label class="form-check-label" for="inputSpoilersOption0">
              Blur out all story-related duties
            </label>
          </div>
          <div class="form-check">
            <input
              v-model="settings.spoilersOption"
              class="form-check-input"
              type="radio"
              name="inputSpoilersOption"
              id="inputSpoilersOption1"
              value="1"
            />
            <label class="form-check-label" for="inputSpoilersOption1">
              Blur out non-completed story-related duties
            </label>
          </div>
          <div class="form-check">
            <input
              v-model="settings.spoilersOption"
              class="form-check-input"
              type="radio"
              name="inputSpoilersOption"
              id="inputSpoilersOption2"
              value="2"
            />
            <label class="form-check-label" for="inputSpoilersOption2">Show all duties</label>
          </div>
          <div class="form-text">Preference in hiding potential spoilers.</div>
          <br />

          <h3>Theme color</h3>
          <div class="form-check">
            <input
              v-model="settings.nightMode"
              class="form-check-input"
              type="checkbox"
              id="inputNightMode"
            />
            <label class="form-check-label" for="inputNightMode"> Night mode</label>
          </div>
          <div class="form-text">An eye-friendly darker theme for the site.</div>

          <br />
          <button
            @click="saveSettings"
            type="button"
            id="settings-save-btn"
            class="btn btn-success"
          >
            Update settings
          </button>
          <br /><br />
        </div>
        <div class="col-md-6">
          <h2>Characters</h2>
          <h3>List of characters</h3>
          <ul v-if="!this.$store.getters.hasCharacter" class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-start">
              There are no loaded characters yet.
            </li>
          </ul>
          <ul v-else class="list-group list-group-flush">
            <li
              v-for="(item, i) of this.$store.state.characters"
              :key="item.ID"
              class="list-group-item d-flex justify-content-between align-items-start"
            >
              <div class="ms-2 me-auto">
                <img
                  style="display: block; float: left; height: 50px"
                  class="avatar-list"
                  :src="item.characterData.Character.Avatar"
                  alt="Portrait of your character"
                />
                <div style="float: left">
                  <span class="fw-bold">{{ item.characterData.Character.Name }}</span>
                  <br />
                  <span v-if="item.characterData.AchievementsPublic" class="text-muted fw-light">
                    Last updated {{ lastUpdatedAt(item.lastUpdated) }}.
                  </span>
                  <span v-else class="text-warning fw-light">
                    <abbr
                      title="The achievements for this characters are not set to public in Lodestone."
                    >
                      Achievements non-public.
                    </abbr>
                  </span>
                </div>
              </div>
              <a
                class="bi-trash text-danger cursor-pointer"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Remove"
                @click="removeCharacter(i)"
              ></a>
            </li>
          </ul>

          <br />
          <h3>Add a new character</h3>

          <div class="form-floating mb-3">
            <input
              v-model="profileURL"
              type="text"
              class="form-control"
              name="inputCharacterID"
              id="inputCharacterID"
              placeholder=""
            />
            <label class="floating-label" for="inputCharacterID">
              Lodestone character profile URL
            </label>
            <div class="form-text">
              <abbr
                title="Hint: It looks like this: finalfantasyxiv.com/lodestone/character/32741501/"
              >
                Profile URL
              </abbr>
              for your character. You can find it in
              <a
                class="text-reset"
                href="https://na.finalfantasyxiv.com/lodestone/character/"
                target="_blank"
                rel="noopener noreferrer"
                >Lodestone</a
              >.
            </div>
          </div>

          <button
            v-if="adding"
            type="button"
            id="settings-save-btn"
            class="btn btn-success"
            disabled
          >
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Adding, please wait...
          </button>
          <button
            v-else
            @click="addCharacter"
            type="button"
            id="settings-save-btn"
            class="btn btn-success"
          >
            Add character
          </button>
          <br /><br />
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.night .floating-label {
  color: #b9bbbe;
}

.night .form-control {
  color: #dbdcdd;
  background-color: #262b2f;
}

.avatar-list {
  border-radius: 50%;
  height: 43px;
  margin-right: 10px;
}
</style>

<script>
import Alert from "@/components/Alert.vue";

export default {
  name: "Settings",
  data() {
    return {
      adding: false,
      error: "",
      profileURL: "",
      settings: { ...this.$store.state.settings },
    };
  },
  components: {
    Alert,
  },
  methods: {
    saveSettings() {
      this.$store.commit("updateSettings", this.settings);
    },
    addCharacter() {
      this.adding = true;

      if (this.profileURL.endsWith("/")) this.profileURL = this.profileURL.slice(0, -1);
      let profileID = this.profileURL.split("/").slice(-1).pop();

      fetch("https://xivapi.com/character/" + profileID + "?data=AC", {
        method: "GET",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw response;
          }
        })
        .then((characterData) => {
          // Inject character data.
          let achievementList = characterData.Achievements?.List || [];
          for (let i = 0; i < achievementList.length; i++) {
            if (achievementList[i].ID == 789) {
              characterData.PlayingSince = achievementList[i].Date;
            }
          }

          // Save character data.
          this.$store.commit("addCharacter", characterData);
        })
        .catch((err) => {
          if (err.status == 404) {
            this.error = "The character profile you have entered does not exist.";
          } else {
            this.error = "An unknown error has ocurred while fetching character data.";
          }
        })
        .finally(() => {
          this.profileURL = "";
          this.adding = false;
        });
    },
    removeCharacter(id) {
      this.$store.commit("removeCharacter", id);
    },
    lastUpdatedAt(timestamp) {
      let now = new Date();
      let diff = now - timestamp;
      let months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hours = Math.floor(diff / (1000 * 60 * 60));
      let minutes = Math.floor(diff / (1000 * 60));

      if (minutes < 1) return "less than a minute ago";
      else if (minutes < 120) return minutes + " minutes ago";
      else if (hours < 48) return hours + " hours ago";
      else if (days < 60) return days + " days ago";
      else return months + " months ago";
    },
  },
};
</script>
