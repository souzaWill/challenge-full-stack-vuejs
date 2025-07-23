import api from './api'

interface Credentials {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

export const handleLoginRequest = async (credentials: Credentials): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>('/login', credentials)
  return data
}
