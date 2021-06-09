import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

store.commit("initialiseStore");
createApp(App).use(store).use(router).mount("#app");

store.subscribe((_mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});
