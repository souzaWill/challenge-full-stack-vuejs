import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Student } from '@/types/student'
import {
  fetchStudentsApi,
  createStudentApi,
  updateStudentApi,
  deleteStudentApi,
  findById,
} from '@/services/studentService'
import { useErrorStore } from './error'
import { useLoadingStore } from './loading'

export const useStudentsStore = defineStore('student', () => {
  const students = ref<Student[]>([])
  const totalItems = ref(0)
  const itemsPerPage = ref(10)
  const search = ref('')
  const loadingStore = useLoadingStore()
  const errorStore = useErrorStore()

  const setSearch = (term: string) => {
    search.value = term
  }

  const handleError = (err: any) => {
    const response = err.response
    const msg = response?.data?.message || 'Erro inesperado'
    const status = response?.status || 500
    const fields = response?.data?.errors || []

    errorStore.setError(msg, status, fields)
  }

  const fetchStudents = async () => {
    loadingStore.start()
    errorStore.clearError()

    try {
      const { data, total } = await fetchStudentsApi()
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
    errorStore.clearError()
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
    errorStore.clearError()
    try {
      return await findById(id)
    } catch (err: any) {
      handleError(err)
    } finally {
      loadingStore.stop()
    }
  }

  const updateStudent = async (data: any) => {
    loadingStore.start()
    errorStore.clearError()
    try {
      return await updateStudentApi(data)
    } catch (err: any) {
      handleError(err)
    } finally {
      loadingStore.stop()
    }
  }

  const deleteStudent = async (id: string) => {
    loadingStore.start()
    errorStore.clearError()
    try {
      await deleteStudentApi(id)
    } catch (err: any) {
      handleError(err)
    } finally {
      loadingStore.stop()
    }
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
  }
})
