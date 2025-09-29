import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Wcn from '../views/Wcn.vue'
import Bmwt from '../views/Bmwt.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/wcn',
      name: 'wcn',
      component: Wcn,
    },
    {
      path: '/bmwt',
      name: 'bmwt',
      component: Bmwt,
    },
  ],
})

export default router
