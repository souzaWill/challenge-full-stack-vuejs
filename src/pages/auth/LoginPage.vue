<template>
  <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
    <ErrorAlert :message="errorMessage" />
    <LoginForm :onSuccess="handleLoginSuccess" :onError="handleLoginError" />
    <SigninText />
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import { useRouter } from 'vue-router'
import ErrorAlert from '@/components/shared/ErrorAlert.vue'
import SigninText from '@/components/auth/SigninText.vue'

const router = useRouter()
const errorMessage = ref<string | null>(null)

const handleLoginSuccess = () => {
  router.push('/')
}

const handleLoginError = (message: string | null) => {
  errorMessage.value = message
}
</script>
