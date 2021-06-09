<template>
  <div
    :class="{ night: this.$store.state.settings.nightMode }"
    class="d-flex flex-column min-vh-100"
  >
    <TheNavbar />
    <main class="flex-shrink-0">
      <router-view />
    </main>
    <TheFooter />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Quicksand", sans-serif;
  font-size: 18px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
    border-color: #aaa;
  }

  .form-check-input {
    background-color: #1c2024;
    border: 1px solid rgb(255, 255, 255);
  }
}

h2 {
  text-decoration: underline;
}

hr {
  height: 0px;
  border: none;
  border-top: 1px solid #c8c8c8;
  opacity: 1;
  background-color: initial;
}

.cursor-pointer {
  cursor: pointer;
}
</style>

<script>
import TheNavbar from "@/components/TheNavbar.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "App",
  components: {
    TheNavbar,
    TheFooter,
  },
};
</script>
