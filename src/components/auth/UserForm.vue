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
      :error-messages="userStore.getFieldError('name')"
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
      :error-messages="userStore.getFieldError('email')"
    />
    <v-text-field
      class="mb-2"
      v-model="password"
      :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
      label="Senha"
      :type="visiblePassword ? 'text' : 'password'"
      density="compact"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="() => (visiblePassword = !visiblePassword)"
      :rules="[rules.required, rules.passwordMin]"
      :error-messages="userStore.getFieldError('password')"
    />
    <v-text-field
      class="mb-2"
      v-model="confirmPassword"
      :append-inner-icon="visibleConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
      label="Confime a senha"
      :type="visibleConfirmPassword ? 'text' : 'password'"
      density="compact"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="() => (visibleConfirmPassword = !visibleConfirmPassword)"
      :rules="[rules.required, rules.confirmPassword(password)]"
      :error-messages="userStore.getFieldError('confirmPassword')"
    />
    <v-btn type="submit" block class="mb-8" color="blue" size="large" variant="tonal">
      Criar conta
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { rules } from '@/utils/validationRules'

const emit = defineEmits<{
  (e: 'success'): void
  (e: 'error', message: string | null): void
}>()

const name = ref('')
const password = ref('')
const email = ref('')
const confirmPassword = ref('')

const valid = ref(false)
const formRef = ref()
const visiblePassword = ref(false)
const visibleConfirmPassword = ref(false)
const userStore = useUserStore()

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
  success ? emit('success') : emit('error', userStore.error)
}
</script>
