<template>
  <div class="container">
    <h1>
      Settings
      <small v-if="this.$store.getters.character.Name" class="text-muted">
        - {{ this.$store.getters.character.Name }}
      </small>
    </h1>
    <Alert v-if="error" :msg="error" />
    <hr />
    <form name="settings-form" id="settings-form">
      <div class="row">
        <div class="col-md-6">
          <h2>General</h2>

          <div class="form-floating mb-3">
            <input
              v-model="settings.characterId"
              type="text"
              class="form-control"
              name="inputCharacterID"
              id="inputCharacterID"
              placeholder=""
            />
            <label for="inputCharacterID">Character ID</label>
            <div class="form-text">
              Enter your character ID. You can find it in
              <a
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
          <div class="form-text">Select your preference in spoiler tags.</div>

          <br />
          <button
            v-if="saving"
            type="button"
            id="settings-save-btn"
            class="btn btn-primary"
            disabled
          >
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Saving...
          </button>
          <button
            v-else
            @click="saveSettings"
            type="button"
            id="settings-save-btn"
            class="btn btn-primary"
          >
            Save
          </button>

          <br /><br />
          <span v-if="settings.lastUpdated" class="text-muted">
            Last updated on {{ new Date(settings.lastUpdated).toISOString() }}.
          </span>
        </div>
      </div>
    </form>
  </div>
</template>

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
  },
};
</script>
