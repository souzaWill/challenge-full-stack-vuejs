<template>
  <v-form ref="formRef" v-model="valid" @submit.prevent="handleSubmit">
    <v-text-field
      class="mb-2"
      v-model="name"
      label="Nome"
      type="text"
      density="compact"
      prepend-inner-icon="mdi-account-outline"
      variant="outlined"
      :rules="[rules.required, rules.name, rules.nameOnlyLetters]"
      :error-messages="getFieldErrors(userStore.fieldErrors, 'email')"
    />
    <v-text-field
      class="mb-2"
      v-model="email"
      label="Email"
      type="text"
      density="compact"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      :rules="[rules.required, rules.email]"
      :error-messages="getFieldErrors(userStore.fieldErrors, 'email')"
    />
    <v-text-field
      class="mb-2"
      v-model="password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      label="Senha"
      :type="visible ? 'text' : 'password'"
      density="compact"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="() => (visible = !visible)"
      :rules="[rules.required, rules.passwordMin]"
      :error-messages="getFieldErrors(userStore.fieldErrors, 'password')"
    />
    <v-text-field
      class="mb-2"
      v-model="confirmPassword"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      label="Confime a senha"
      :type="visible ? 'text' : 'password'"
      density="compact"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="() => (visible = !visible)"
      :rules="[rules.required, rules.confirmPassword(password)]"
      :error-messages="getFieldErrors(userStore.fieldErrors, 'confirmPassword')"
    />
    <v-btn type="submit" block class="mb-8" color="blue" size="large" variant="tonal">
      Sign Up
    </v-btn>
  </v-form>

  <!-- TODO: talvez esse componente deva ficar globalmente ou na pagina de login avaliar -->
  <AppLoading :show="userStore.loading" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getFieldErrors } from '@/utils/getFieldErrors'
import AppLoading from '@/components/shared/AppLoading.vue'
import { useUserStore } from '@/stores/user'

const { onSuccess, onError } = defineProps<{
  onSuccess: () => void
  onError: (message: string | null) => void
}>()

const name = ref('')
const password = ref('')
const email = ref('')
const confirmPassword = ref('')

const valid = ref(false)
const formRef = ref()
const visible = ref(false)
const userStore = useUserStore()

const rules = {
  required: (v: string) => !!v || 'Campo obrigatório',
  name: (v: string) => (v && v.trim().length >= 2) || 'O nome deve ter ao menos 2 caracteres',
  nameOnlyLetters: (v: string) =>
    /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(v) || 'O nome só pode conter letras e espaços',
  email: (v: string) => /.+@.+\..+/.test(v) || 'E-mail inválido',
  passwordMin: (v: string) => v.length >= 8 || 'A senha deve ter no mínimo 8 caracteres',
  confirmPassword: (password: string) => {
    return (v: string) => v === password || 'As senhas não coincidem'
  },
}

const handleSubmit = async () => {
  valid.value = (await formRef.value?.validate())?.valid

  if (!valid.value) return

  const formData = {
    name: name.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  }

  const success = await userStore.create(formData)
  success ? onSuccess() : onError(userStore.error)
}
</script>
