import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Wcn from '../views/Wcn.vue'
import Bmwt from '../views/Bmwt.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/wcn',
      name: 'Wcn',
      component: Wcn,
    },
    {
      path: '/bmwt',
      name: 'Bmwt',
      component: Bmwt,
    },
  ],
})

export default router
