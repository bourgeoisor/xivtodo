import { createApp } from "vue";
import { VueHeadMixin, createHead } from "@unhead/vue/client";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import { configure } from "vue-gtag";

configure({
  tagId: "G-9WXY5M43Z0",
  config: {
    cookie_domain: "xivtodo.com",
    cookie_flags: "SameSite=None;Secure",
  },
})

store.commit("initialiseStore");
const head = createHead();
createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(head)
  .mixin(VueHeadMixin)
  .mount("#app");

store.subscribe((_mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});
