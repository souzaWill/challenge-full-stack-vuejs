import { defineStore } from 'pinia'
import { ref } from 'vue'
import { handleStoreUser } from '@/services/userService'
import { useErrorStore } from './error'
import { useLoadingStore } from './loading'

interface UserForm {
  email: string
  name: string
  password: string
  confirmPassword: string
}

export const useUserStore = defineStore('user', () => {
  const errorStore = useErrorStore()
  const loadingStore = useLoadingStore()

  const handleError = (err: any) => {
    const response = err.response
    const msg =
      response?.data?.message || 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.'
    const status = response?.status || 500
    const fields = response?.data?.errors || []

    errorStore.setError(msg, status, fields)
  }

  const create = async (userForm: UserForm) => {
    loadingStore.start()
    errorStore.clearError()

    try {
      await handleStoreUser(userForm)
      return true
    } catch (err: any) {
      handleError(err)
    } finally {
      loadingStore.stop()
    }
  }

  return {
    create,
  }
})
