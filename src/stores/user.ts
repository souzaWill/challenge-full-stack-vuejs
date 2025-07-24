import { defineStore } from 'pinia'
import { handleStoreUser } from '@/services/userService'
import { useLoadingStore } from './loading'
import { ref, computed } from 'vue'

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
  const loadingStore = useLoadingStore()
  const fieldErrors = ref<FieldError[]>([])
  const error = ref('')

  const handleError = (err: any) => {
    const response = err.response
    const msg =
      response?.data?.message || 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.'
    const fields = response?.data?.errors || []

    setError(msg, fields)
  }

  const create = async (userForm: UserForm) => {
    loadingStore.start()
    clearError()

    try {
      await handleStoreUser(userForm)
      return true
    } catch (err: any) {
      handleError(err)
    } finally {
      loadingStore.stop()
    }
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
    create,
    hasError,
    getFieldError,
    clearError,
    setError,
    error,
  }
})
