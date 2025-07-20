import { defineStore } from 'pinia'
import { ref } from 'vue'
import { handleStoreUser } from '@/services/userService'

interface UserForm {
  email: string
  name: string
  password: string
  confirmPassword: string
}

interface FieldError {
  field: string
  message: string
}

export const useUserStore = defineStore('user', () => {
  const loading = ref(false)
  const fieldErrors = ref<FieldError[] | null>(null)
  const error = ref<string | null>(null)

  const resetErrors = () => {
    fieldErrors.value = null
    error.value = null
  }

  const create = async (userForm: UserForm) => {
    loading.value = true
    resetErrors()

    try {
      await handleStoreUser(userForm)
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

  return {
    loading,
    fieldErrors,
    error,
    create,
  }
})
