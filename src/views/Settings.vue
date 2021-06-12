<template>
  <div class="container">
    <h1>Settings</h1>
    <Alert v-if="error" :msg="error" />
    <hr />
    <form name="settings-form" id="settings-form">
      <div class="row">
        <div class="col-md-6">
          <h2>General</h2>
          <br />
          <div class="form-floating mb-3">
            <input
              v-model="settings.characterId"
              type="text"
              class="form-control"
              name="inputCharacterID"
              id="inputCharacterID"
              placeholder=""
            />
            <label class="floating-label" for="inputCharacterID">Character ID</label>
            <div class="form-text">
              Your character ID. You can find it in
              <a
                class="text-reset"
                href="https://na.finalfantasyxiv.com/lodestone/character/"
                target="_blank"
                rel="noopener noreferrer"
                >Lodestone</a
              >.
            </div>
          </div>

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
            v-if="saving"
            type="button"
            id="settings-save-btn"
            class="btn btn-secondary"
            disabled
          >
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Updating, please wait...
          </button>
          <button
            v-else
            @click="saveSettings"
            type="button"
            id="settings-save-btn"
            class="btn btn-secondary"
          >
            Update
          </button>

          <br /><br />
          <template v-if="settings.lastUpdated">
            <span class="text-muted fw-light">
              Last updated {{ lastUpdatedAt(settings.lastUpdated) }}
            </span>
            <br /><br />
          </template>
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
</style>

<script>
import Alert from "@/components/Alert.vue";

export default {
  name: "Settings",
  data() {
    return {
      saving: false,
      error: "",
      settings: { ...this.$store.state.settings },
    };
  },
  components: {
    Alert,
  },
  methods: {
    saveSettings() {
      this.saving = true;

      fetch("https://xivapi.com/character/" + this.settings.characterId + "?data=AC", {
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
          this.settings.lastUpdated = parseInt(Date.now());
          this.$store.commit("updateSettings", this.settings);
          this.$store.commit("updateCharacterData", characterData);
        })
        .catch((err) => {
          if (err.status == 404) {
            this.error = "The character ID you have entered does not exist.";
          } else {
            this.error = "An unknown error has ocurred while fetching character data.";
          }
        })
        .finally(() => {
          this.saving = false;
        });
    },
    lastUpdatedAt(timestamp) {
      let now = new Date();
      let diff = now - timestamp;
      let months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hours = Math.floor(diff / (1000 * 60 * 60));
      let minutes = Math.floor(diff / (1000 * 60));

      if (minutes < 5) return "less than a couple minutes ago.";
      else if (minutes < 120) return minutes + " minutes ago.";
      else if (hours < 48) return hours + " hours ago.";
      else if (days < 60) return days + " days ago.";
      else return months + " months ago.";
    },
  },
};
</script>
