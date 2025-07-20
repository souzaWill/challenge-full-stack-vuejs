<template>
  <v-form ref="formRef" v-model="valid" @submit.prevent="handleSubmit">
    <v-text-field
      v-model="email"
      label="E-mail"
      type="text"
      density="compact"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
      :rules="[rules.required, rules.email]"
      :error-messages="getFieldErrors(authStore.fieldErrors, 'email')"
    />
    <!-- TODO add space betwen -->
    <v-text-field
      v-model="password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      label="Senha"
      :type="visible ? 'text' : 'password'"
      density="compact"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="() => (visible = !visible)"
      :rules="[rules.required]"
      :error-messages="getFieldErrors(authStore.fieldErrors, 'password')"
    />
    <v-btn type="submit" block class="mb-8" color="blue" size="large" variant="tonal">
      Log in
    </v-btn>
  </v-form>

  <!-- TODO: talvez esse componente deva ficar globalmente ou na pagina de login avaliar -->
  <AppLoading :show="authStore.loading" />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { getFieldErrors } from '@/utils/getFieldErrors'
import AppLoading from '@/components/shared/AppLoading.vue'

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

const rules = {
  required: (v: string) => !!v || 'Campo obrigatório',
  email: (v: string) => /.+@.+\..+/.test(v) || 'E-mail inválido',
}

const handleSubmit = async () => {
  valid.value = (await formRef.value?.validate())?.valid

  if (!valid.value) return

  const credentials = { email: email.value, password: password.value }
  const success = await authStore.login(credentials)
  success ? onSuccess() : onError(authStore.error)
}
</script>
