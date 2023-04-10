import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import VueGtag from "vue-gtag";

store.commit("initialiseStore");
createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(
    VueGtag,
    {
      config: {
        id: "G-9WXY5M43Z0",
        params: {
          cookie_domain: "xivtodo.com",
          cookie_flags: "SameSite=None;Secure",
        },
      },
    },
    router
  )
  .mount("#app");

store.subscribe((_mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});
