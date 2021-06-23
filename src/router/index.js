import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

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
    path: "/profile",
    name: "Profile",
    component: () => import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
  },
  {
    path: "/duties",
    name: "Duties",
    component: () => import(/* webpackChunkName: "duties" */ "../views/Duties.vue"),
  },
  {
    path: "/questlines",
    name: "Questlines",
    component: () => import(/* webpackChunkName: "questlines" */ "../views/Questlines.vue"),
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
  },
  {
    path: "/character/:id",
    name: "Character",
    component: () => import(/* webpackChunkName: "character" */ "../views/Character.vue"),
  },
  {
    path: "/faq",
    name: "FAQ",
    component: () => import(/* webpackChunkName: "faq" */ "../views/FAQ.vue"),
  },
  {
    path: "/privacy",
    name: "Privacy Policy",
    component: () => import(/* webpackChunkName: "privacy" */ "../views/PrivacyPolicy.vue"),
  },
  {
    path: "/:catchAll(.*)",
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
