import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import { authenticate } from "../utilities/backend";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (_to, _from, next) => {
      if (sessionStorage.getItem("redirect") !== null) {
        const redirect = sessionStorage.redirect;
        delete sessionStorage.redirect;
        next(redirect);
      } else {
        next();
      }
    },
  },
  {
    path: "/auth",
    component: Home,
    beforeEnter: (_to, _from, next) => {
      authenticate(_to.query.code)
        .then((userData) => {
          store.commit("setUserData", userData);
        })
        .catch((err) => {
          // @TODO: handle rendering error to user
          store.commit("signIn", false);
          console.log(err);
        });

      store.commit("signIn", true);
      next("/");
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
    beforeEnter: (_to, _from, next) => {
      if (!store.getters.hasCharacter) {
        next("/");
      }
      next();
    },
  },
  {
    path: "/encounters",
    name: "Encounters",
    component: () => import(/* webpackChunkName: "encounters" */ "../views/Encounters.vue"),
  },
  {
    path: "/questlines",
    name: "Questlines",
    component: () => import(/* webpackChunkName: "questlines" */ "../views/Questlines.vue"),
  },
  {
    path: "/challenges",
    name: "Challenges",
    component: () => import(/* webpackChunkName: "challenges" */ "../views/Challenges.vue"),
  },
  {
    path: "/checklist",
    name: "Checklist",
    component: () => import(/* webpackChunkName: "checklist" */ "../views/Checklist.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import(/* webpackChunkName: "settings" */ "../views/Settings.vue"),
    beforeEnter: (_to, _from, next) => {
      if (!store.getters.userData) {
        next("/");
      }
      next();
    },
  },
  {
    path: "/character/:id",
    name: "Character",
    component: () => import(/* webpackChunkName: "character" */ "../views/Character.vue"),
  },
  {
    path: "/help",
    name: "Help",
    component: () => import(/* webpackChunkName: "help" */ "../views/Help.vue"),
  },
  {
    path: "/privacy",
    name: "Privacy Policy",
    component: () => import(/* webpackChunkName: "privacy" */ "../views/PrivacyPolicy.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: {
      name: "Home",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // eslint-disable-next-line no-unused-vars
  scrollBehavior(to, from, savedPosition) {
    document.getElementById("app").scrollIntoView();
  },
});

export default router;
