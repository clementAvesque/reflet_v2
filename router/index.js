import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import PersonalisationPage from "../pages/personnalisation.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/personnalisation",
    name: "personnalisation",
    component: PersonalisationPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
});


export default router;
