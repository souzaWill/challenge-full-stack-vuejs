import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
interface FieldError {
  field: string
  message: string
}

export const useErrorStore = defineStore('error', () => {
  const message = ref('')
  const statusCode = ref<number | null>(null)
  const visible = ref(false)

  const fieldErrors = ref<FieldError[] | null>(null)

  const hasError = computed(() => !!message.value)

  const setError = (msg: string, code: number | null = null, fields: FieldError[]) => {
    message.value = msg
    statusCode.value = code
    fieldErrors.value = fields
    visible.value = true
  }

  const clearError = () => {
    message.value = ''
    statusCode.value = null
    visible.value = false
    fieldErrors.value = []
  }

  const getFieldError = (field: string) => {
    return fieldErrors?.value
      ?.filter((error) => error.field === field)
      ?.map((error) => error.message)
  }

  return {
    message,
    statusCode,
    visible,
    fieldErrors,
    hasError,
    getFieldError,
    setError,
    clearError,
  }
})
