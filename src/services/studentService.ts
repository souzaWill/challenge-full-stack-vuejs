import type { Student } from '@/types/student'
import api from './api'

export async function fetchStudentsApi() {
  const response = await api.get('/students')
  return response.data
}

export async function findById(id: string): Promise<Student> {
  const response = await api.get(`/students/${id}`)
  return response.data
}

export async function createStudentApi(data: Student) {
  const response = await api.post(`/students`, data)
  return response.data
}

export async function updateStudentApi(data: Student) {
  const response = await api.put(`/students/${data.id}`, data)
  return response.data
}
export async function deleteStudentApi(id: string) {
  return await api.delete(`/students/${id}`)
}
