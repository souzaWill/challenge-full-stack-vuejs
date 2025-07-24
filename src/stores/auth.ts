import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { handleLoginRequest } from '@/services/authService'
import type { User } from '@/types/user'
import { useLoadingStore } from './loading'

interface Credentials {
  email: string
  password: string
}

interface FieldError {
  field: string
  message: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref(localStorage.getItem('token'))
  const loadingStore = useLoadingStore()
  const fieldErrors = ref<FieldError[]>([])
  const error = ref('')

  const isAuthenticated = computed(() => !!token.value)

  const handleError = (err: any) => {
    const response = err.response
    const msg =
      response?.data?.message || 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.'
    const fields = response?.data?.errors || []

    setError(msg, fields)
  }

  const login = async (credentials: Credentials) => {
    loadingStore.start()
    clearError()

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

  const hasError = computed(() => !!error.value || fieldErrors.value?.length > 0)

  const getFieldError = (field: string) => {
    return fieldErrors?.value
      ?.filter((error) => error.field === field)
      ?.map((error) => error.message)
  }

  const clearError = () => {
    error.value = ''
    fieldErrors.value = []
  }

  const setError = (msg: string, fields: FieldError[]) => {
    error.value = msg
    fieldErrors.value = fields
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    hasError,
    getFieldError,
    clearError,
    setError,
    error,
  }
})
