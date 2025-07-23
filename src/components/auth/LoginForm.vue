<template>
  <v-form ref="formRef" v-model="valid" @submit.prevent="handleSubmit">
    <v-text-field
      class="mb-4"
      v-model="email"
      label="E-mail"
      type="text"
      density="compact"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      :rules="[rules.required, rules.email]"
      :error-messages="errorStore.getFieldError('email')"
    />

    <v-text-field
      class="mb-4"
      v-model="password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      label="Senha"
      :type="visible ? 'text' : 'password'"
      density="compact"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="() => (visible = !visible)"
      :rules="[rules.required]"
      :error-messages="errorStore.getFieldError('password')"
    />
    <v-btn type="submit" block class="mb-8" color="blue" size="large" variant="tonal">
      Log in
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useErrorStore } from '@/stores/error'

const { onSuccess, onError } = defineProps<{
  onSuccess: () => void
  onError: (message: string | null) => void
}>()

const email = ref('')
const password = ref('')
const valid = ref(false)
const formRef = ref()
const visible = ref(false)
const authStore = useAuthStore()
const errorStore = useErrorStore()

const rules = {
  required: (v: string) => !!v || 'Campo obrigatório',
  email: (v: string) => /.+@.+\..+/.test(v) || 'E-mail inválido',
}

const handleSubmit = async () => {
  valid.value = (await formRef.value?.validate())?.valid

  if (!valid.value) return

  const credentials = { email: email.value, password: password.value }
  const success = await authStore.login(credentials)
  success ? onSuccess() : onError(errorStore.message)
  //TODO changing to emit
}
</script>
