<template>
  <div :class="{ night: true }" class="d-flex flex-column min-vh-100">
    <TheNavbar />
    <main class="flex-shrink-0">
      <div v-if="this.$store.getters.backendOffline" class="container">
        <AlertMsg type="error" :msg="$t('message.backendUnavailable')" />
      </div>
      <!-- <div v-else-if="!this.$store.getters.versionMatches" class="container">
        <AlertMsg
          type="success"
          msg="A new version is available! <a href='javascript:window.location.reload()' class='alert-link'>Reload and update the page</a>."
        />
      </div> -->
      <div v-if="this.globalError" class="container">
        <AlertMsg type="error" :msg="this.globalError" />
      </div>
      <div v-if="this.$store.state.signingIn == true" class="container">
        <AlertMsg type="normal" :msg="$t('message.signingDiscord')" />
      </div>
      <router-view />
    </main>
    <TheFooter />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Nunito", "Noto Sans JP", sans-serif;
  font-size: 18px;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  padding-top: 75px;
}

/* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #41b883 #262b2f;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: #262b2f;
}

*::-webkit-scrollbar-thumb {
  background-color: #41b883;
  border-radius: 20px;
  border: 3px solid #262b2f;
}

/* Tooltips */
.tt {
  position: relative;
}

.tt .tt-text {
  visibility: hidden;
  width: auto;
  white-space: nowrap;
  background-color: #2b3136;
  color: #c5c6c7;
  text-align: center;
  border-radius: 10px;
  padding: 8px 10px;
  position: absolute;
  z-index: 10;
  bottom: 130%;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  user-select: none !important;
}

.tt .tt-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #2b3136 transparent transparent transparent;
}

@media only screen and (max-width: 800px) {
  .tt .tt-text {
    display: none;
  }
}

.tt:hover .tt-text {
  visibility: visible;
}

.night {
  color: #dddddd;
  background-color: #1c2024;

  .text-secondary {
    color: #a2a4a6 !important;
  }

  .list-group-item {
    color: #dddddd;
    background-color: #1c2024;
    border-color: #484848;
  }

  .form-check-input {
    background-color: #1c2024;
    border: 1px solid rgb(255, 255, 255);
  }

  .border {
    border-color: #444444 !important;
  }

  .border-bottom {
    border-color: #41b883 !important;
  }

  .border-grey {
    border-color: #444444 !important;
  }

  .floating-label {
    color: #b9bbbe;
  }

  .form-control {
    color: #dbdcdd;
    background-color: #262b2f;
  }
}

.indent-paragraphs p {
  margin-left: 20px;
}

.list-group-item {
  padding-bottom: 0.4rem;
}

table {
  color: #ddd !important;
}

tbody,
td,
tfoot,
th,
thead,
tr {
  border-color: #484848;
}

a,
a:focus {
  color: #41b883;
}

a:hover {
  color: #22e38d;
}

h1 {
  font-weight: 700;
  margin-bottom: 0px !important;
}

h1 .border-bottom {
  border-color: #41b883 !important;
}

h3 {
  font-weight: 700;

  img {
    height: 0.8em;
    margin-right: 10px;
  }
}

hr {
  height: 0px;
  border: none;
  border-top: 1px solid #41b883;
  opacity: 1;
  background-color: initial;
  margin-top: 12px;
  margin-bottom: 12px;
}

.cursor-pointer {
  cursor: pointer;
}

.text-bold {
  font-weight: 800;
}

.text-justify {
  text-align: justify;
  text-justify: inter-word;
}

.text-success {
  color: #53b462 !important;
}

.text-danger {
  color: #b45353 !important;
}

.text-info {
  color: #9dd1ff !important;
}

.text-muted {
  color: #6c757d !important;
}

.form-text {
  color: #6c757d;
}

.btn-outline-success {
  color: #41b883;
  border-color: #41b883;
}

.lodestone-tooltip {
  text-decoration-style: dashed;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  cursor: help;
}

.lodestone-tooltip {
  text-decoration-color: rgba(255, 255, 255, 0.5);
}

.text-secondary .lodestone-tooltip {
  text-decoration-color: rgba(162, 164, 166, 0.5);
}

.text-success .lodestone-tooltip {
  text-decoration-color: rgba(83, 180, 98, 0.5);
}

.text-danger .lodestone-tooltip {
  text-decoration-color: rgba(180, 83, 83, 0.5);
}
</style>

<script>
import TheNavbar from "@/components/TheNavbar.vue";
import TheFooter from "@/components/TheFooter.vue";
import AlertMsg from "@/components/AlertMsg.vue";
import { getVersion, getUserData, addCharacter } from "@/utilities/backend.js";

export default {
  name: "App",
  components: {
    TheNavbar,
    TheFooter,
    AlertMsg,
  },
  data() {
    return {
      intervalFunction: null,
      tabFocused: true,
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.setLanguage();
      this.checkUpstreamVersion();
      this.updateUserData();
      setTimeout(() => this.updateCharactersData(), 1000 * 10); // 10 seconds
    });
    this.intervalFunction = setInterval(() => {
      if (this.tabFocused) {
        this.checkUpstreamVersion();
        this.updateCharactersData();
      }
    }, 1000 * 60); // 1 minute
  },
  unmounted() {
    clearInterval(this.intervalFunction);
  },
  computed: {
    computeWindowTitle() {
      const routeName = this.$route.name;

      if (routeName === undefined || routeName === "Home") {
        return `XIV ToDo: ${this.$t("page.homeTitle")}`;
      } else {
        // Erase any previous sign-in error
        this.$store.commit("signingIn", false);

        const i18nRouteName = this.$t(`page.${routeName.toLowerCase()}`);
        return `XIV ToDo - ${i18nRouteName}`;
      }
    },
    globalError() {
      if (this.$store.state.signingIn?.status == 401) {
        return this.$t("message.signingUnauthorizedError");
      } else if (this.$store.state.signingIn?.status == 500) {
        return this.$t("message.signingUnknownError");
      } else {
        return "";
      }
    },
  },
  watch: {
    computeWindowTitle: "setWindowTitle",
  },
  created() {
    this.setWindowTitle();
    this.detectFocusOut();
  },
  methods: {
    setWindowTitle() {
      document.title = this.computeWindowTitle;
    },
    detectFocusOut() {
      let inView = false;

      const onWindowFocusChange = (e) => {
        if ({ focus: 1, pageshow: 1 }[e.type]) {
          if (inView) return;
          this.tabFocused = true;
          inView = true;
        } else if (inView) {
          this.tabFocused = !this.tabFocused;
          inView = false;
        }
      };

      window.addEventListener("focus", onWindowFocusChange);
      window.addEventListener("blur", onWindowFocusChange);
      window.addEventListener("pageshow", onWindowFocusChange);
      window.addEventListener("pagehide", onWindowFocusChange);
    },
    setLanguage() {
      if (this.$store.getters.language === null) {
        let locale = navigator.language.split("-")[0];
        if (locale === "fr" || locale === "de" || locale === "ja") {
          this.$store.commit("setLanguage", locale);
        } else {
          this.$store.commit("setLanguage", "en");
        }
      }
      this.$i18n.locale = this.$store.getters.language;
    },
    checkUpstreamVersion() {
      getVersion()
        .then((version) => {
          this.$store.commit("setUpstreamVersion", version);
        })
        .catch(() => {
          this.$store.commit("setUpstreamVersion", "OFFLINE");
        });
    },
    updateUserData() {
      if (this.$store.getters.isSignedIn) {
        getUserData()
          .then((userData) => {
            this.$store.commit("setUserData", userData);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    updateCharactersData() {
      let i = 0;
      for (let character of this.$store.getters.characters) {
        if (this.$store.getters.characterOutOfDate(i)) {
          let localID = i;
          console.log("Updating data for " + character.lodestoneData.Character.Name + "...");

          let characterID = character.lodestoneData.Character.ID;
          addCharacter(characterID)
            .then((characterData) => {
              this.$store.commit("addCharacter", characterData);
              console.log("Data for " + characterData.lodestoneData.Character.Name + " updated.");
            })
            .catch((err) => {
              console.log(err);
              this.error = err;
              if (err.status == 404) {
                this.$store.commit("invalidateCharacter", localID);
              }
            });
        }
        i++;
      }
    },
  },
};
</script>
