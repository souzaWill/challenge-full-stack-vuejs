import AuthLayout from '@/layouts/AuthLayout.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import { useAuthStore } from '@/stores/auth'
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
      path: '/signin',
      component: GuestLayout,
      children: [
        {
          path: '',
          name: 'signin',
          component: () => import('@/pages/SignUpPage.vue'),
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
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/login', //TODO fazer uma pagina de 404
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !authStore.isAuthenticated) next('/login')
  next()
})

export default router
