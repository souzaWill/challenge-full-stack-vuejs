<template>
  <v-form ref="formRef" v-model="valid" @submit.prevent="handleSubmit">
    <v-card-text>
      <v-text-field
        v-model="form.registrationNumber"
        label="RA"
        :readonly="props.isEdit"
        :disabled="!props.isEdit"
      />
      <v-text-field
        v-model="form.user.name"
        label="Nome"
        :error-messages="errorStore.getFieldError('user.name')"
        :rules="[rules.name, rules.required, rules.nameOnlyLetters]"
      />
      <v-text-field
        v-model="form.user.email"
        label="Email"
        :error-messages="errorStore.getFieldError('user.email')"
        :rules="[rules.email, rules.required]"
      />

      <v-text-field
        v-model="form.document"
        label="CPF"
        :error-messages="errorStore.getFieldError('document')"
        :rules="[rules.required, rules.cpf]"
      />
    </v-card-text>

    <v-divider />

    <v-card-actions>
      <v-spacer />
      <v-btn color="red darken-1" text @click="$emit('cancel')">Voltar</v-btn>
      <v-btn type="submit" color="blue darken-1" text>Salvar</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script setup lang="ts">
import type { Student } from '@/types/student'
import { ref, watch } from 'vue'
import { useStudentsStore } from '@/stores/students'
import { useErrorStore } from '@/stores/error'
import { rules } from '@/utils/validationRules'

const props = defineProps<{
  student?: Student | null
  isEdit?: boolean
}>()
const emit = defineEmits(['submit', 'cancel'])
const studentStore = useStudentsStore()
const errorStore = useErrorStore()

const valid = ref(false)
const formRef = ref()
//TODO melhorar
const form = ref({
  user: {
    name: '',
    email: '',
  },
  registrationNumber: '',
  document: '',
})

watch(
  () => props.student,
  (newStudent) => {
    if (newStudent) {
      form.value = structuredClone(newStudent)
    }
  },
  { immediate: true },
)

const handleSubmit = async () => {
  const valid = await formRef.value?.validate()
  if (!valid) return

  if (props.isEdit) {
    await studentStore.updateStudent(form.value)
  } else {
    await studentStore.createStudent(form.value)
  }
  emit('submit')
}
</script>
