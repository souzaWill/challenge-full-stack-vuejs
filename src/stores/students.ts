import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Student } from '@/types/student'
import {
  fetchStudentsApi,
  createStudentApi,
  updateStudentApi,
  deleteStudentApi,
  findById,
} from '@/services/studentService'
import { useLoadingStore } from './loading'

interface FieldError {
  field: string
  message: string
}

export const useStudentsStore = defineStore('student', () => {
  const students = ref<Student[]>([])
  const totalItems = ref(0)
  const itemsPerPage = ref(10)
  const search = ref('')
  const loadingStore = useLoadingStore()
  const fieldErrors = ref<FieldError[]>([])
  const error = ref('')

  const setSearch = (term: string) => {
    search.value = term
  }

  const handleError = (err: any) => {
    const response = err.response
    const error =
      response?.data?.message || 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.'
    const fields = response?.data?.errors || []
    setError(error, fields)
  }

  const fetchStudents = async (options?: any) => {
    loadingStore.start()
    clearError()

    if (search.value) {
      options = { search: search.value }
    }

    try {
      const { data, total } = await fetchStudentsApi(options)
      students.value = data
      totalItems.value = total
    } catch (err: any) {
      handleError(err)
    } finally {
      loadingStore.stop()
    }
  }

  const createStudent = async (data: any) => {
    loadingStore.start()
    clearError()
    try {
      return await createStudentApi(data)
    } catch (err: any) {
      handleError(err)
    } finally {
      loadingStore.stop()
    }
  }

  const find = async (id: string) => {
    loadingStore.start()
    clearError()
    try {
      return await findById(id)
    } catch (err: any) {
      handleError(err)
    } finally {
      loadingStore.stop()
    }
  }

  const updateStudent = async (id: string, data: any) => {
    loadingStore.start()
    clearError()
    try {
      return await updateStudentApi(id, data)
    } catch (err: any) {
      handleError(err)
    } finally {
      loadingStore.stop()
    }
  }

  const deleteStudent = async (id: string) => {
    loadingStore.start()
    clearError()
    try {
      await deleteStudentApi(id)
    } catch (err: any) {
      handleError(err)
    } finally {
      await fetchStudents()
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
    students,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    totalItems,
    itemsPerPage,
    setSearch,
    find,
    hasError,
    getFieldError,
    clearError,
    setError,
    error,
  }
})
