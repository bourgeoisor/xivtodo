<template>
  <div class="d-flex flex-column min-vh-100">
    <TheNavbar></TheNavbar>
    <main class="flex-shrink-0">
      <router-view />
    </main>
    <TheFooter></TheFooter>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Quicksand", sans-serif;
  font-size: 18px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
