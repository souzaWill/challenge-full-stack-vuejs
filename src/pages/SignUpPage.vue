<template>
  <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
    <ErrorAlert :message="errorMessage" />
    <UserForm :onSuccess="handleSignupSuccess" :onError="handleSignupError" />
    <SignupText />
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ErrorAlert from '@/components/shared/ErrorAlert.vue'
import SignupText from '@/components/auth/SignupText.vue'
import UserForm from '@/components/auth/UserForm.vue'

const router = useRouter()
const errorMessage = ref<string | null>(null)

const handleSignupSuccess = () => {
  router.push('/login')
}

const handleSignupError = (message: string | null) => {
  errorMessage.value = message
}
</script>
