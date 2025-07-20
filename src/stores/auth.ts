import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const user = ref<{ email: string } | null>(null)

  async function login(email: string, password: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === 'admin@example.com' && password === '123456') {
      isLoggedIn.value = true
      user.value = { email }
    } else {
      throw new Error('Credenciais inválidas')
    }
  }

  function logout() {
    isLoggedIn.value = false
    user.value = null
  }

  return { isLoggedIn, user, login, logout }
})
