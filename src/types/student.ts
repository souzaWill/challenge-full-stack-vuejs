import type { User } from './user'

export type Student = {
  id?: string | null
  registrationNumber: string
  document: string
  user: User
}
