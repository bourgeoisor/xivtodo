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
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
nav {
  margin-bottom: 10px;

  .router-link-exact-active {
    color: white !important;
  }
}
</style>

<script>
export default {
  Name: "TheNavbar",
};
</script>
