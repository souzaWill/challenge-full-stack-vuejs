import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { handleLoginRequest } from '@/services/authService'

interface User {
  id: string
  email: string
  name: string
}

interface FieldError {
  field: string
  message: string
}

interface Credentials {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref(localStorage.getItem('token'))
  const loading = ref(false)
  const fieldErrors = ref<FieldError[] | null>(null)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  const resetErrors = () => {
    fieldErrors.value = null
    error.value = null
  }

  const login = async (credentials: Credentials) => {
    loading.value = true
    resetErrors()

    try {
      const { user: responseUser, token: responseToken } = await handleLoginRequest(credentials)
      user.value = responseUser
      token.value = responseToken
      localStorage.setItem('token', responseToken)
      return true
    } catch (err: any) {
      //TODO: melhorar
      if (err.response) {
        // Erros de resposta do servidor (status code fora de 2xx)
        if (err.response.status === 400 && Array.isArray(err.response.data?.errors)) {
          fieldErrors.value = err.response.data.errors
        } else {
          error.value = err.response.data?.message || 'Ocorreu um erro desconhecido.'
        }
      } else if (err.request) {
        // Requisição feita, mas sem resposta (e.g., rede offline)
        error.value = 'Não foi possível conectar ao servidor. Verifique sua conexão.'
      } else {
        // Algo aconteceu na configuração da requisição que disparou um erro
        error.value = 'Erro ao configurar a requisição de login.'
      }
      return false // Indica falha no login
    } finally {
      loading.value = false
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
    loading,
    fieldErrors,
    error,
    isAuthenticated,
    login,
    logout,
  }
})
