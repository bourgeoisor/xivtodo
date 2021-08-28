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
            <li class="nav-item">
              <router-link to="/" class="nav-link" @click="collapseNav">Home</router-link>
            </li>
            <li v-if="this.$store.getters.hasCharacter" class="nav-item">
              <router-link to="/profile" class="nav-link" @click="collapseNav">Profile</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/encounters" class="nav-link" @click="collapseNav">
                Encounters
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/questlines" class="nav-link" @click="collapseNav">
                Questlines
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/checklist" class="nav-link" @click="collapseNav">
                Checklist
              </router-link>
            </li>
          </ul>
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li v-if="!this.$store.getters.hasCharacter" class="nav-item">
              <router-link to="/settings" class="nav-link" @click="collapseNav">
                Settings
              </router-link>
            </li>
            <li v-else class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ this.$store.getters.characterData.Character.Name }}
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end dropdown-menu-dark"
                aria-labelledby="navbarDropdown"
              >
                <li><h6 class="dropdown-header">Change active character</h6></li>
                <li v-for="(item, i) of this.$store.state.characters" :key="item.ID">
                  <span
                    v-if="i == this.$store.state.activeCharacterID"
                    class="dropdown-item active"
                    >{{ item.characterData.Character.Name }}</span
                  >
                  <a v-else class="dropdown-item" href="#" @click="changeActiveCharacter(i)">
                    {{ item.characterData.Character.Name }}
                  </a>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <router-link to="/settings" class="dropdown-item" @click="collapseNav">
                    Settings
                  </router-link>
                </li>
              </ul>
            </li>
            <img
              v-if="this.$store.getters.hasCharacter"
              class="avatar-nav d-none d-lg-inline"
              :src="this.$store.getters.character.Avatar"
              alt="Portrait of your character"
            />
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
</template>

<style lang="scss">
.navbar-brand {
  font-family: "Pacifico", cursive;
}

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

.navbar-dark .navbar-nav .nav-link.active {
  color: #a1ff7f;
  text-decoration: underline;
  text-decoration-thickness: auto;
  text-decoration-thickness: 2px;
  text-underline-offset: 7px;
}

.avatar-nav {
  border-radius: 50%;
  height: 43px;
  margin-left: 10px;
}

.dropdown-menu-dark .dropdown-item.active,
.dropdown-menu-dark .dropdown-item:focus {
  background-color: #262b30;
}
</style>

<script>
export default {
  Name: "TheNavbar",
  methods: {
    collapseNav() {
      let navCollapse = document.getElementById("navbarSupportedContent");
      navCollapse.classList.remove("show");
    },
    changeActiveCharacter(i) {
      this.$store.commit("changeActiveCharacter", i);
      this.collapseNav();
    },
  },
};
</script>
