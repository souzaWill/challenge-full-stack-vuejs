import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { handleLoginRequest } from '@/services/authService'
import type { User } from '@/types/user'
import { useErrorStore } from './error'
import { useLoadingStore } from './loading'

interface Credentials {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref(localStorage.getItem('token'))
  const loadingStore = useLoadingStore()
  const errorStore = useErrorStore()

  const isAuthenticated = computed(() => !!token.value)

  const handleError = (err: any) => {
    const response = err.response
    const msg =
      response?.data?.message || 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.'
    const status = response?.status || 500
    const fields = response?.data?.errors || []

    errorStore.setError(msg, status, fields)
  }

  const login = async (credentials: Credentials) => {
    loadingStore.start()
    errorStore.clearError()

    try {
      const { user: responseUser, token: responseToken } = await handleLoginRequest(credentials)
      user.value = responseUser
      token.value = responseToken
      localStorage.setItem('token', responseToken)
      return true
    } catch (err: any) {
      handleError(err)
    } finally {
      loadingStore.stop()
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
  }
})
