import api from './api'
import type { User } from '@/types/user'

interface RegisterUserPayload {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const handleStoreUser = async (user: RegisterUserPayload): Promise<User> => {
  const { data } = await api.post<User>('/register', user)
  return data
}
