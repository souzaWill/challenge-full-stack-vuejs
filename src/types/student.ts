export interface Student {
  id?: string | null
  registrationNumber: string
  document: string
  user: {
    email: string
    name: string
  }
}
