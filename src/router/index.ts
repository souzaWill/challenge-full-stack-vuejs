import AuthLayout from '@/layouts/AuthLayout.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: GuestLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/pages/LoginPage.vue'),
        },
      ],
    },
    {
      path: '/',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/pages/HomePage.vue'),
        },
      ],
    },
  ],
})

export default router
