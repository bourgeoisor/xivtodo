<template>
  <header>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid user-select-none">
        <router-link to="/" class="navbar-brand mb-0 h1">
          <img style="height: 28px" src="../assets/brand.png" alt="XIV ToDo branding" />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          v-if="this.$route.name != 'Character'"
          class="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li v-if="this.$store.getters.hasCharacter" class="nav-item">
              <router-link to="/profile" class="nav-link" @click="collapseNav">
                {{ $t("page.profile") }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/encounters" class="nav-link" @click="collapseNav">
                {{ $t("page.encounters") }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/questlines" class="nav-link" @click="collapseNav">
                {{ $t("page.questlines") }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/challenges" class="nav-link" @click="collapseNav">
                {{ $t("page.challenges") }}
              </router-link>
            </li>
            <!-- <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="collectionDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
              {{ $t("page.collection") }}
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end dropdown-menu-dark"
                aria-labelledby="collectionDropdown"
              >
                <li>
                  <router-link to="/achievements" class="dropdown-item" @click="collapseNav">
                    <i class="fa-fw fal fa-trophy"></i> {{ $t("page.achievements") }}
                  </router-link>
                  <router-link to="/titles" class="dropdown-item" @click="collapseNav">
                    <i class="fa-fw fal fa-scroll"></i> {{ $t("page.titles") }}
                  </router-link>
                  <router-link to="/mounts" class="dropdown-item" @click="collapseNav">
                    <i class="fa-fw fal fa-horse-saddle"></i> {{ $t("page.mounts") }}
                  </router-link>
                  <router-link to="/minions" class="dropdown-item" @click="collapseNav">
                    <i class="fa-fw fal fa-cat-space"></i> {{ $t("page.minions") }}
                  </router-link>
                </li>
              </ul>
            </li> -->
            <li class="nav-item">
              <router-link to="/checklist" class="nav-link" @click="collapseNav">
                {{ $t("page.checklist") }}
              </router-link>
            </li>
          </ul>
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasCountdowns"
                aria-controls="offcanvasCountdowns"
                @click="seenLatestCountdown()"
              >
                <span class="d-inline d-lg-none">{{ $t("page.countdowns") }} </span>
                <span class="fa-fw fal fa-clock position-relative">
                  <span
                    v-if="
                      this.$store.getters.isSignedIn &&
                      this.$store.getters.latestCountdownSeen < news.latestCountdownID
                    "
                    class="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle"
                  >
                  </span>
                </span>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasUpdates"
                aria-controls="offcanvasUpdates"
                @click="seenLatestNews()"
              >
                <span class="d-inline d-lg-none">{{ $t("page.newsUpdates") }} </span>
                <span class="fa-fw fal fa-bell position-relative">
                  <span
                    v-if="
                      this.$store.getters.isSignedIn &&
                      this.$store.getters.latestNewsSeen < news.latestID
                    "
                    class="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle"
                  >
                  </span>
                </span>
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link"
                href="#"
                id="collectionDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                @click="this.$store.commit('setFlag', { key: 'languageClicked', value: true })"
              >
                <span class="d-inline d-lg-none">{{ $t("page.language") }} </span>
                <span class="fa-fw fal fa-globe-americas position-relative">
                  <span
                    v-if="!this.$store.getters.flag('languageClicked')"
                    class="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle"
                  >
                  </span>
                </span>
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end dropdown-menu-dark"
                aria-labelledby="collectionDropdown"
              >
                <li>
                  <h6 class="dropdown-header">{{ $t("navbar.preferredLanguage") }}</h6>
                </li>
                <li v-if="this.$store.getters.language == 'en'">
                  <span class="dropdown-item active" @click="collapseNav">
                    English
                    <i class="fa-fw fal fa-check"></i>
                  </span>
                </li>
                <li v-else>
                  <a class="dropdown-item" href="#" @click="changeLanguage('en')">English</a>
                </li>
                <li v-if="this.$store.getters.language == 'fr'">
                  <span class="dropdown-item active" @click="collapseNav">
                    Français (TEC)
                    <i class="fa-fw fal fa-check"></i>
                  </span>
                </li>
                <li v-else>
                  <a class="dropdown-item" href="#" @click="changeLanguage('fr')">Français (TEC)</a>
                </li>
                <li v-if="this.$store.getters.language == 'de'">
                  <span class="dropdown-item active" @click="collapseNav">
                    Deutsch (WIP)
                    <i class="fa-fw fal fa-check"></i>
                  </span>
                </li>
                <li v-else>
                  <a class="dropdown-item" href="#" @click="changeLanguage('de')">Deutsch (WIP)</a>
                </li>
                <li v-if="this.$store.getters.language == 'ja'">
                  <span class="dropdown-item active" @click="collapseNav">
                    日本語 (仕掛品)
                    <i class="fa-fw fal fa-check"></i>
                  </span>
                </li>
                <li v-else>
                  <a class="dropdown-item" href="#" @click="changeLanguage('ja')">日本語 (仕掛品)</a>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a
                    class="dropdown-item"
                    href="https://crowdin.com/project/xiv-todo/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fa-fw fal fa-comments-alt"></i> {{ $t("navbar.feedback")}}
                  </a>
                </li>
              </ul>
            </li>
            <li v-if="!this.$store.getters.isSignedIn" class="nav-item">
              <a class="nav-link" :href="this.$store.state.env.VUE_APP_DISCORD_AUTH_URI">
                {{ $t("home.signInDiscord") }}
              </a>
            </li>
            <li v-else class="nav-item dropdown">
              <a
                class="nav-link"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span v-if="this.$store.getters.hasCharacter">
                  {{ this.$store.getters.lodestoneData.Character.Name }}
                  <img
                    v-if="this.$store.getters.hasCharacter"
                    class="avatar-nav d-none d-lg-inline"
                    :src="this.$store.getters.character.Avatar"
                    :alt="$t('shared.portraitAlt')"
                  />
                </span>
                <span v-else>
                  {{ $t("page.settings") }}
                </span>
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end dropdown-menu-dark"
                aria-labelledby="navbarDropdown"
              >
                <div v-if="this.$store.getters.hasCharacter">
                  <li>
                    <h6 class="dropdown-header">{{ $t("navbar.changeActiveCharacter") }}</h6>
                  </li>
                  <li v-for="(item, i) of this.$store.getters.characters" :key="item.ID">
                    <span
                      v-if="i == this.$store.state.activeCharacterID"
                      class="dropdown-item active"
                    >
                      <b>{{ item.lodestoneData.Character.Name }}</b>
                      – {{ item.lodestoneData.Character.World }}
                      <i class="fa-fw fal fa-check"></i>
                    </span>
                    <a v-else class="dropdown-item" href="#" @click="changeActiveCharacter(i)">
                      <b>{{ item.lodestoneData.Character.Name }}</b>
                      – {{ item.lodestoneData.Character.World }}
                    </a>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                </div>
                <li>
                  <h6 class="dropdown-header">
                    {{ this.$store.getters.discordUser.username }}#{{
                      this.$store.getters.discordUser.discriminator
                    }}
                  </h6>
                </li>
                <li>
                  <a class="dropdown-item cursor-pointer" @click="signOut">
                    <i class="fa-fw fal fa-power-off"></i> {{ $t("page.signOut") }}
                  </a>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <router-link to="/settings" class="dropdown-item" @click="collapseNav">
                    <i class="fa-fw fal fa-cog"></i> {{ $t("page.settings") }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div v-else class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="nav navbar-nav me-auto mb-2 mb-lg-0" id="nav-tab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                @click="collapseNav"
              >
                Profile
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="nav-duties-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-duties"
                type="button"
                role="tab"
                @click="collapseNav"
              >
                Encounters
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                id="nav-questlines-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-questlines"
                type="button"
                role="tab"
                @click="collapseNav"
              >
                Questlines
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasCountdowns">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasCountdownsLabel">{{ $t("page.countdowns") }}</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <div v-for="item in news.countdowns" :key="item.title">
        <h3>{{ item.title }}</h3>
        <small v-if="item.end && new Date() / 1000 > item.end" class="text-danger">
          This event has ended
        </small>
        <small v-else-if="item.start && new Date() / 1000 < item.start" class="text-muted">
          Starting in
          <b class="text-info">
            <abbr :title="dateFormat(item.start)">{{ timeLeft(item.start) }}</abbr>
          </b>
        </small>
        <small v-else-if="item.end" class="text-muted">
          Ending in
          <b class="text-success">
            <abbr :title="dateFormat(item.end)">{{ timeLeft(item.end) }}</abbr>
          </b>
        </small>
        <small v-else class="text-success">Currently available</small>
        <br />
        <p>
          <span v-html="item.description"></span>
          <br />
          <span v-if="item.url">
            <a class="text-reset" :href="item.url" target="_blank" rel="noopener noreferrer">
              More details
              <i class="fa-fw fal fa-external-link"></i>
            </a>
          </span>
        </p>
        <br />
      </div>
    </div>
  </div>

  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasUpdates">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasUpdatesLabel">{{ $t("page.newsUpdates") }}</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
    </div>
    <div class="offcanvas-body">
      <div v-for="item in news.news" :key="item.ID">
        <h3>{{ item.title }}</h3>
        <small class="text-muted">
          Posted on <b class="text-success">{{ item.published }}</b>
        </small>
        <br />
        <p v-html="item.content"></p>
        <br />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
nav {
  margin-bottom: 10px;

  .nav-link.router-link-exact-active {
    color: #41b883 !important;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 7px;
  }
}

.night nav {
  border-bottom: 1px solid #333333;
}

span.nav-link:hover {
  color: rgba(255, 255, 255, 0.75) !important;
  text-decoration: none !important;
}

.navbar-dark .navbar-nav .nav-link {
  color: rgba(255, 255, 255, 0.75);
}

.navbar-dark .navbar-nav .nav-link:hover {
  color: rgba(255, 255, 255, 1);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 7px;
}

.avatar-nav {
  border-radius: 50%;
  height: 35px;
  margin-left: 10px;
  margin-right: -5px;
  margin-top: -5px;
  float: right;
}

.dropdown-menu-dark .dropdown-item.active,
.dropdown-menu-dark .dropdown-item:focus {
  background-color: #262b30;
}

.offcanvas {
  background-color: #1c2024;
}

.offcanvas-header .btn-close {
  background: transparent
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23ddd'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e")
    center/1em auto no-repeat;
}
</style>

<script>
import news from "@/assets/news.json";
import { updateSettings } from "@/utilities/backend.js";

export default {
  Name: "TheNavbar",
  data() {
    return {
      news: news,
    };
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      this.$store.commit("setLanguage", lang);
      this.collapseNav();
    },
    signOut() {
      this.$store.commit("deleteUserData");
      this.$router.push("/");
    },
    collapseNav() {
      let navCollapse = document.getElementById("navbarSupportedContent");
      navCollapse.classList.remove("show");
    },
    changeActiveCharacter(i) {
      this.$store.commit("changeActiveCharacter", i);
      this.collapseNav();
    },
    seenLatestNews() {
      if (!this.$store.getters.isSignedIn) return;

      let settings = { ...this.$store.getters.settings };
      if (settings.latestNewsSeen == news.latestID) return;

      settings.latestNewsSeen = news.latestID;
      this.$store.commit("setSettings", settings);
      updateSettings(settings);
    },
    seenLatestCountdown() {
      if (!this.$store.getters.isSignedIn) return;

      let settings = { ...this.$store.getters.settings };
      if (settings.latestCountdownSeen == news.latestCountdownID) return;

      settings.latestCountdownSeen = news.latestCountdownID;
      this.$store.commit("setSettings", settings);
      updateSettings(settings);
    },
    timeLeft(timestamp) {
      let now = new Date() / 1000;
      let diff = timestamp - now;
      let days = Math.floor(diff / (1 * 60 * 60 * 24));
      let hours = Math.floor(diff / (1 * 60 * 60));
      let minutes = Math.floor(diff / (1 * 60));

      if (days > 0) return days + "d " + (hours - days * 24) + "h";
      else if (hours > 0) return hours + "h " + (minutes - hours * 60) + "m";
      else return minutes + "m";
    },
    dateFormat(timestamp) {
      let date = new Date(timestamp * 1000);
      return date;
    },
  },
};
</script>
