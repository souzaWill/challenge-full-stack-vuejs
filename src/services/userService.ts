import api from './api'

interface User {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface UserResponse {
  id: string
  email: string
  name: string
}

export const handleStoreUser = async (user: User): Promise<UserResponse> => {
  const { data } = await api.post<UserResponse>('/register', user)
  return data
}
