import { createRouter, createWebHistory } from 'vue-router'
import Homepage from './page/homepage.vue'
import personnalisation from './page/personnalisation.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Homepage
  },
  {
    path: '/personnalisation',
    name: 'Personnalisation',
    component: personnalisation
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
