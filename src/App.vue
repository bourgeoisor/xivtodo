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
  font-family: "Nunito", sans-serif;
  font-size: 18px;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.night {
  color: #dddddd;
  background-color: #1c2024;

  .text-secondary {
    color: #a2a4a6 !important;
  }

  .text-danger {
    color: #cd3442 !important;
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

.list-group-item {
  padding-bottom: 0.4rem;
}

hr {
  margin-top: 8px;
  margin-bottom: 8px;
}

h1 {
  font-weight: 700;
  margin-bottom: 0px !important;
}

h2 {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
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

.text-bold {
  font-weight: 800;
}

.lodestone-tooltip {
  text-decoration-style: dashed;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  cursor: help;
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
  computed: {
    computeWindowTitle() {
      const routeName = this.$route.name;
      const home = routeName === "home";

      let title = "XIV·ToDo";
      if (!home) {
        title = title + " - " + routeName;
      }

      return title;
    },
  },
  watch: {
    computeWindowTitle: "setWindowTitle",
  },
  created() {
    this.setWindowTitle();
  },
  methods: {
    setWindowTitle() {
      document.title = this.computeWindowTitle;
    },
  },
};
</script>
