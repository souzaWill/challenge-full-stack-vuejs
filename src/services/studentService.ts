import type { Student } from '@/types/student'
import api from './api'

export async function fetchStudentsApi(params: any) {
  const response = await api.get('/students', { params })
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

export async function updateStudentApi(id: string, data: Student) {
  const response = await api.put(`/students/${id}`, data)
  return response.data
}
export async function deleteStudentApi(id: string) {
  const response = await api.delete(`/students/${id}`)
  return response.data
}
