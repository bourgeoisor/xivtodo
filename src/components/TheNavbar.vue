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
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link" @click="collapseNav">Home</router-link>
            </li>
            <li v-if="this.$store.getters.character" class="nav-item">
              <router-link to="/profile" class="nav-link" @click="collapseNav">Profile</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/duties" class="nav-link" @click="collapseNav">Duties</router-link>
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
            <li class="nav-item">
              <router-link to="/settings" class="nav-link" @click="collapseNav">
                Settings
              </router-link>
            </li>
          </ul>
          <li v-if="this.$store.getters.character" class="navbar-nav nav-item d-none d-lg-block">
            <span class="nav-link">{{ this.$store.getters.character.Name }}</span>
          </li>
          <img
            v-if="this.$store.getters.character"
            class="avatar d-none d-lg-block"
            :src="this.$store.getters.character.Avatar"
            alt="Portrait of your character"
          />
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

.avatar {
  border-radius: 50%;
  height: 34px;
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
  },
};
</script>
