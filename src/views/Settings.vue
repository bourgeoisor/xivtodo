<template>
  <div class="container">
    <h1>{{ $t("page.settings") }}</h1>
    <AlertMsg v-if="error.msg" :type="error.type" :msg="error.msg" />
    <hr />
    <form name="settings-form" id="settings-form">
      <div class="row">
        <div class="col-lg-6">
          <h2>Characters</h2>

          <h3>Add a new character</h3>
          <div class="mb-3">
            <label for="inputCharacterID" class="form-label">Profile URL</label>
            <input
              v-model="profileURL"
              type="text"
              class="form-control"
              id="inputCharacterID"
              placeholder="https://na.finalfantasyxiv.com/lodestone/character/12345/"
            />
            <div class="form-text">
              The URL for your character profile. You can find it in
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
            :class="{ disabled: !profileURL }"
          >
            Add character
          </button>
          <br /><br />

          <h3>Your characters</h3>
          <ul v-if="!this.$store.getters.hasCharacter" class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-start">
              Once you add your characters, they will appear here.
            </li>
          </ul>
          <ul v-else class="list-group list-group-flush">
            <li
              v-for="(item, i) of this.$store.getters.characters"
              :key="item.ID"
              class="list-group-item d-flex justify-content-between align-items-start"
            >
              <div class="ms-2 me-auto">
                <img
                  style="display: block; float: left; height: 50px"
                  class="avatar-list"
                  :src="item.lodestoneData.Character.Avatar"
                  alt="Portrait of your character"
                />
                <div style="float: left">
                  <span class="fw-bold">{{ item.lodestoneData.Character.Name }}</span>
                  – {{ item.lodestoneData.Character.World }}
                  <br />
                  <span
                    v-if="
                      this.updating == item.lodestoneData.Character.ID ||
                      this.$store.getters.characterOutOfDate(i)
                    "
                    class="text-info fw-light"
                  >
                    <div class="spinner-border spinner-border-sm" role="status"></div>
                    Updating character data...
                  </span>
                  <span v-else class="text-muted fw-light">
                    Last updated {{ lastUpdatedAt(item.updated) }}
                    <span
                      v-if="
                        !item.lodestoneData.Achievements ||
                        item.lodestoneData.Achievements.length == 0
                      "
                      class="text-warning"
                    >
                      <br />
                      <abbr
                        title="The achievements for this characters are not set to public in Lodestone."
                      >
                        Achievements are not public
                      </abbr>
                    </span>
                  </span>
                </div>
              </div>
              <a
                v-if="!updating && !this.$store.getters.characterOutOfDate(i)"
                class="bi-arrow-repeat text-secondary cursor-pointer tt"
                @click="updateCharacter(item.lodestoneData.Character.ID)"
              >
                <span class="tt-text">Update data</span>
              </a>
              &nbsp;&nbsp;
              <a
                v-if="!updating"
                class="bi-trash text-danger cursor-pointer tt"
                @click="removeCharacter(i)"
              >
                <span class="tt-text">Remove character</span>
              </a>
            </li>
          </ul>
          <br />
        </div>
        <div class="col-lg-6">
          <h2>General</h2>
          <h3>Content spoilers</h3>
          <div class="form-check">
            <input
              v-model="settings.spoilersOption"
              class="form-check-input"
              type="radio"
              name="inputSpoilersOption"
              id="inputSpoilersOption0"
              :value="0"
            />
            <label class="form-check-label" for="inputSpoilersOption0">
              Blur out non-completed story-related encounters
            </label>
          </div>
          <div class="form-check">
            <input
              v-model="settings.spoilersOption"
              class="form-check-input"
              type="radio"
              name="inputSpoilersOption"
              id="inputSpoilersOption1"
              :value="1"
            />
            <label class="form-check-label" for="inputSpoilersOption1">
              Blur out all story-related encounters
            </label>
          </div>
          <div class="form-check">
            <input
              v-model="settings.spoilersOption"
              class="form-check-input"
              type="radio"
              name="inputSpoilersOption"
              id="inputSpoilersOption2"
              :value="2"
            />
            <label class="form-check-label" for="inputSpoilersOption2">Show all encounters</label>
          </div>
          <div class="form-text">Preference in hiding potential spoilers.</div>
          <br />
          <button
            v-if="updatingSettings"
            type="button"
            id="settings-save-btn"
            class="btn btn-success"
            disabled
          >
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Updating, please wait...
          </button>
          <button
            v-else
            @click="updateSettings"
            type="button"
            id="settings-save-btn"
            class="btn btn-success"
          >
            Update settings
          </button>
          <br /><br />
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.avatar-list {
  border-radius: 50%;
  height: 43px;
  margin-right: 10px;
}
</style>

<script>
import AlertMsg from "@/components/AlertMsg.vue";
import { updateSettings, addCharacter, removeCharacter } from "@/utilities/backend.js";

export default {
  name: "SettingsView",
  data() {
    return {
      adding: false,
      updatingSettings: false,
      updating: 0,
      error: {},
      profileURL: "",
      settings: { ...this.$store.getters.settings },
    };
  },
  components: {
    AlertMsg,
  },
  methods: {
    updateSettings() {
      this.updatingSettings = true;
      this.error = {};

      updateSettings(this.settings)
        .then((response) => {
          this.$store.commit("setSettings", response);

          this.error = {
            type: "success",
            msg: `Settings updated!`,
          };
        })
        .catch((err) => {
          this.error = {
            type: "error",
            msg: `Settings could not be updated: ${err}`,
          };
        })
        .finally(() => {
          this.updatingSettings = false;
        });
    },
    addCharacter() {
      this.adding = true;
      this.error = {};

      if (this.profileURL.endsWith("/")) this.profileURL = this.profileURL.slice(0, -1);
      let characterID = this.profileURL.split("/").slice(-1).pop();

      addCharacter(characterID)
        .then((characterData) => {
          this.$store.commit("addCharacter", characterData);

          if (
            !characterData.lodestoneData.Achievements ||
            characterData.lodestoneData.Achievements.length == 0
          ) {
            this.error = {
              type: "warning",
              msg: `Character <b>${characterData.lodestoneData.Character.Name}</b> added, but their achievements are not set to public. You can change that setting <a href='https://na.finalfantasyxiv.com/lodestone/my/setting/account/' class='alert-link' target='_blank' rel='noopener noreferrer'>here</a>, and then update the character's data.`,
            };
          } else {
            this.error = {
              type: "success",
              msg: `Character <b>${characterData.lodestoneData.Character.Name}</b> added! You can now access your <a href='/profile' class='alert-link'>Profile</a> and all character completion pages.`,
            };
          }
        })
        .catch((err) => {
          console.log(err);
          this.error = { type: "error", msg: err.toString() };
        })
        .finally(() => {
          this.profileURL = "";
          this.adding = false;
        });
    },
    updateCharacter(characterID) {
      this.updating = characterID;
      this.error = {};

      addCharacter(characterID)
        .then((characterData) => {
          this.$store.commit("addCharacter", characterData);
        })
        .catch((err) => {
          console.log(err);
          this.error = { type: "error", msg: err.toString() };
        })
        .finally(() => {
          this.profileURL = "";
          this.updating = null;
        });
    },
    removeCharacter(id) {
      this.updating = true;
      this.error = {};

      let characterID = this.$store.getters.characters[id].lodestoneData.Character.ID;
      let characterName = this.$store.getters.characters[id].lodestoneData.Character.Name;

      removeCharacter(characterID)
        .then(() => {
          this.$store.commit("removeCharacter", id);

          this.error = {
            type: "success",
            msg: `Character <b>${characterName}</b> removed!`,
          };
        })
        .catch((err) => {
          console.log(err);
          this.error = { type: "error", msg: err.toString() };
        })
        .finally(() => {
          this.updating = false;
        });
    },
    lastUpdatedAt(timestamp) {
      let now = new Date() / 1000;
      let diff = now - timestamp;
      let months = Math.floor(diff / (60 * 60 * 24 * 30));
      let days = Math.floor(diff / (60 * 60 * 24));
      let hours = Math.floor(diff / (60 * 60));
      let minutes = Math.floor(diff / 60);

      if (minutes < 2) return "a couple seconds ago";
      else if (minutes < 120) return minutes + " minutes ago";
      else if (hours < 48) return hours + " hours ago";
      else if (days < 60) return days + " days ago";
      else return months + " months ago";
    },
  },
};
</script>
