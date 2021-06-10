import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueGtag from "vue-gtag";

store.commit("initialiseStore");
createApp(App)
  .use(store)
  .use(router)
  .use(
    VueGtag,
    {
      config: {
        id: "G-9WXY5M43Z0",
      },
    },
    router
  )
  .mount("#app");

store.subscribe((_mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});
