import AuthLayout from '@/layouts/AuthLayout.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
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
          component: () => import('@/pages/auth/LoginPage.vue'),
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
          component: () => import('@/pages/auth/SignUpPage.vue'),
        },
      ],
    },
    {
      path: '/',
      redirect: '/students',
    },
    {
      path: '/students',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'students.list',
          component: () => import('@/pages/students/StudentListPage.vue'),
        },
        {
          path: 'create',
          name: 'students.create',
          component: () => import('@/pages/students/StudentFormPage.vue'),
        },
        {
          path: '/students/:id/edit',
          name: 'students.edit',
          component: () => import('@/pages/students/StudentFormPage.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundPage,
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
