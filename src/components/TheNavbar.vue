<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand mb-0 h1">XIV|ToDo</router-link>
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
              <router-link to="/" class="nav-link">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/duties" class="nav-link">Duties</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/questlines" class="nav-link">Questlines</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/checklist" class="nav-link">Checklist</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/settings" class="nav-link">Settings</router-link>
            </li>
          </ul>
          <li
            v-if="this.$store.getters.characterData"
            class="navbar-nav nav-item d-none d-lg-block user-select-none"
          >
            <span class="nav-link">{{ this.$store.getters.character.Name }}</span>
          </li>
          <img
            v-if="this.$store.getters.characterData"
            class="avatar d-none d-lg-block"
            :src="this.$store.getters.character.Avatar"
          />
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss">
nav {
  margin-bottom: 10px;

  .router-link-exact-active {
    color: white !important;
  }
}

.night nav {
  border-bottom: 1px solid #333333;
}

span.nav-link:hover {
  color: rgba(255, 255, 255, 0.55) !important;
}

.avatar {
  border-radius: 50%;
  height: 34px;
}
</style>

<script>
export default {
  Name: "TheNavbar",
};
</script>
