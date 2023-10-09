<template>
  <div class="container">
    <h1>{{ $t("page.settings") }}</h1>
    <AlertMsg v-if="error.msg" :type="error.type" :msg="error.msg" />
    <hr />
    <form name="settings-form" id="settings-form">
      <div class="row">
        <div class="col-lg-6">
          <h2>{{ $t("settings.characters") }}</h2>

          <h3>{{ $t("settings.addNewCharacter") }}</h3>
          <div class="mb-3">
            <label for="inputCharacterID" class="form-label">
              {{ $t("settings.profileUrl.label") }}
            </label>
            <input
              v-model="profileURL"
              type="text"
              class="form-control"
              id="inputCharacterID"
              :placeholder="getLodestoneURL() + 'character/12345/'"
            />
            <div class="form-text">
              <i18n-t keypath="settings.profileUrl.hint">
                <a class="text-reset" :href="getLodestoneURL() + 'character/'" target="_blank" rel="noopener noreferrer"
                  >Lodestone</a
                >
              </i18n-t>
            </div>
          </div>
          <button v-if="adding" type="submit" id="settings-save-btn" class="btn btn-success" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            {{ $t("shared.addingWait") }}
          </button>
          <button
            v-else
            @click="addCharacter"
            type="submit"
            id="settings-save-btn"
            class="btn btn-success"
            :class="{ disabled: !profileURL }"
          >
            {{ $t("settings.addCharacter") }}
          </button>
          <br /><br />

          <h3>{{ $t("settings.myCharacters") }}</h3>
          <ul v-if="!this.$store.getters.hasCharacter" class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-start">
              {{ $t("settings.myCharactersHelp") }}
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
                  class="avatar-list d-none d-sm-inline"
                  :src="item.lodestoneData.Character.Avatar"
                  :alt="$t('shared.portraitAlt')"
                />
                <div style="float: left">
                  <span class="fw-bold">{{ item.lodestoneData.Character.Name }}</span>
                  – {{ item.lodestoneData.Character.World }}
                  <br />
                  <span
                    v-if="this.updating == item.lodestoneData.Character.ID || this.$store.getters.characterOutOfDate(i)"
                    class="text-info fw-light"
                  >
                    <div class="spinner-border spinner-border-sm" role="status"></div>
                    {{ $t("shared.updatingWait") }}
                  </span>
                  <span v-else-if="item.invalid" class="text-danger fw-light">
                    <abbr :title="$t('settings.characterNotFoundAlt')">
                      {{ $t("settings.characterNotFound") }}
                    </abbr>
                  </span>
                  <span v-else class="text-muted fw-light">
                    {{ $t("settings.lastUpdated", { time: lastUpdatedAt(item.updated) }) }}
                    <span
                      v-if="!item.lodestoneData.Achievements || item.lodestoneData.Achievements.length == 0"
                      class="text-warning"
                    >
                      <br />
                      <abbr :title="$t('settings.achievementsNotPublicAlt')">
                        {{ $t("settings.achievementsNotPublic") }}
                      </abbr>
                    </span>
                  </span>
                </div>
              </div>
              <a
                v-if="!updating && !this.$store.getters.characterOutOfDate(i)"
                class="text-secondary cursor-pointer tt"
                @click="updateCharacter(item.lodestoneData.Character.ID)"
              >
                <i class="fa-fw fad fa-sync-alt"></i>
                <span class="tt-text">{{ $t("shared.update") }}</span>
              </a>
              &nbsp;&nbsp;
              <a
                class="text-secondary cursor-pointer tt"
                :href="getLodestoneURL() + 'character/' + item.lodestoneData.Character.ID + '/'"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa-fw fad fa-external-link"></i>
                <span class="tt-text">{{ $t("shared.lodestone") }}</span>
              </a>
              &nbsp;&nbsp;
              <a
                v-if="!updating && !this.$store.getters.characterOutOfDate(i)"
                class="text-danger cursor-pointer tt"
                @click="removeCharacter(i)"
              >
                <i class="fa-fw fad fa-trash-alt"></i>
                <span class="tt-text">{{ $t("shared.remove") }}</span>
              </a>
            </li>
          </ul>
          <br />
        </div>

        <div class="col-lg-6">
          <h2>{{ $t("settings.general") }}</h2>
          <h3>{{ $t("settings.contentSpoilers.label") }}</h3>
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
              {{ $t("settings.contentSpoilers.option0") }}
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
              {{ $t("settings.contentSpoilers.option1") }}
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
            <label class="form-check-label" for="inputSpoilersOption2">
              {{ $t("settings.contentSpoilers.option2") }}
            </label>
          </div>
          <div class="form-text">{{ $t("settings.contentSpoilers.hint") }}</div>

          <br />

          <h3>{{ $t("settings.patchNumbers.label") }}</h3>
          <div class="form-check">
            <input
              v-model="settings.patchNumsOption"
              class="form-check-input"
              type="radio"
              name="inputPatchNumsOption"
              id="inputPatchNumsOption0"
              :value="0"
            />
            <label class="form-check-label" for="inputPatchNumsOption0">
              {{ $t("settings.patchNumbers.option0") }}
            </label>
          </div>
          <div class="form-check">
            <input
              v-model="settings.patchNumsOption"
              class="form-check-input"
              type="radio"
              name="inputPatchNumsOption"
              id="inputPatchNumsOption1"
              :value="1"
            />
            <label class="form-check-label" for="inputPatchNumsOption1">
              {{ $t("settings.patchNumbers.option1") }}
            </label>
          </div>
          <div class="form-check">
            <input
              v-model="settings.patchNumsOption"
              class="form-check-input"
              type="radio"
              name="inputPatchNumsOption"
              id="inputPatchNumsOption2"
              :value="2"
            />
            <label class="form-check-label" for="inputPatchNumsOption2">
              {{ $t("settings.patchNumbers.option2") }}
            </label>
          </div>
          <div class="form-text">{{ $t("settings.patchNumbers.hint") }}</div>
          <br />

          <button v-if="updatingSettings" type="button" id="settings-save-btn" class="btn btn-success" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            {{ $t("shared.updatingWait") }}
          </button>
          <button v-else @click="updateSettings" type="button" id="settings-save-btn" class="btn btn-success">
            {{ $t("settings.updateSettings") }}
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
import { getLodestoneURL } from "@/utilities/shared.js";
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
    getLodestoneURL: getLodestoneURL,
    updateSettings() {
      this.updatingSettings = true;
      this.error = {};

      updateSettings(this.settings)
        .then((response) => {
          this.$store.commit("setSettings", response);

          this.error = {
            type: "success",
            msg: this.$t("settings.message.settingsUpdated"),
          };
        })
        .catch((err) => {
          if (err.status == 400) {
            this.error = {
              type: "error",
              msg: this.$t("settings.message.settingsUpdateClientError"),
            };
          } else {
            this.error = {
              type: "error",
              msg: this.$t("settings.message.settingsUpdateUnknownError"),
            };
          }
        })
        .finally(() => {
          this.updatingSettings = false;
        });
    },
    addCharacter() {
      this.adding = true;
      this.error = {};

      let characterID = "0";
      let URLSplit = this.profileURL.split("/");
      for (let i = 0; i < URLSplit.length; i++) {
        if (Number.isInteger(parseInt(URLSplit[i]))) {
          characterID = URLSplit[i];
          break;
        }
      }

      addCharacter(characterID)
        .then((characterData) => {
          this.$store.commit("addCharacter", characterData);

          if (!characterData.lodestoneData.Achievements || characterData.lodestoneData.Achievements.length == 0) {
            this.error = {
              type: "warning",
              msg: this.$t("settings.message.characterAddedNotPublic", {
                name: characterData.lodestoneData.Character.Name,
              }),
            };
          } else {
            this.error = {
              type: "success",
              msg: this.$t("settings.message.characterAdded", {
                name: characterData.lodestoneData.Character.Name,
              }),
            };
          }
        })
        .catch((err) => {
          console.log(err);

          if (err.status == 404) {
            this.error = {
              type: "error",
              msg: this.$t("settings.message.characterAddNotFoundError"),
            };
          } else if (err.status == 400) {
            this.error = {
              type: "error",
              msg: this.$t("settings.message.characterAddClientError"),
            };
          } else {
            this.error = {
              type: "error",
              msg: this.$t("settings.message.characterAddServerError"),
            };
          }
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

      if (!confirm(this.$t("settings.message.characterRemoveConfirm", { name: characterName }))) {
        this.updating = false;
        return;
      }

      removeCharacter(characterID)
        .then(() => {
          this.$store.commit("removeCharacter", id);

          this.error = {
            type: "success",
            msg: this.$t("settings.message.characterRemoved", { name: characterName }),
          };
        })
        .catch((err) => {
          console.log(err);
          this.error = {
            type: "error",
            msg: this.$t("settings.message.characterRemoveError", { name: characterName }),
          };
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

      if (minutes < 2) return this.$t("shared.time.coupleSecondsAgo");
      else if (minutes < 120) return this.$t("shared.time.minutesAgo", { minutes: minutes });
      else if (hours < 48) return this.$t("shared.time.hoursAgo", { hours: hours });
      else if (days < 60) return this.$t("shared.time.daysAgo", { days: days });
      else return this.$t("shared.time.monthsAgo", { months: months });
    },
  },
};
</script>
