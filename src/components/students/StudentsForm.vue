<template>
  <v-form ref="formRef" v-model="valid" @submit.prevent="handleSubmit">
    <v-card-text>
      <v-text-field
        v-model="form.registrationNumber"
        label="RA"
        :readonly="isEdit"
        :disabled="!isEdit"
      />
      <v-text-field
        v-model="form.user.name"
        label="Nome"
        :error-messages="studentStore.getFieldError('user.name')"
        :rules="[rules.name, rules.required, rules.nameOnlyLetters]"
      />
      <v-text-field
        v-model="form.user.email"
        label="Email"
        :error-messages="studentStore.getFieldError('user.email')"
        :rules="[rules.email, rules.required]"
      />

      <v-text-field
        :model-value="maskedDocument"
        label="CPF"
        @update:modelValue="onDocumentInput"
        :error-messages="studentStore.getFieldError('document')"
        :rules="[rules.required, rules.cpf]"
        maxlength="14"
        :readonly="isEdit"
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
import { ref, watch, computed } from 'vue'
import { useStudentsStore } from '@/stores/students'
import { rules } from '@/utils/validationRules'
import { formatCPF } from '@/utils/mask'
import { useNotificationStore } from '@/stores/notification'

const props = defineProps<{
  student?: Student | null
  id?: string
}>()
const emit = defineEmits(['submit', 'cancel'])
const studentStore = useStudentsStore()
const notificationStore = useNotificationStore()

const valid = ref(false)
const formRef = ref()
const maskedDocument = computed(() => formatCPF(form.value.document))

const form = ref<Student>({
  registrationNumber: '',
  document: '',
  user: {
    name: '',
    email: '',
  },
})

const onDocumentInput = (value: string) => {
  form.value.document = value.replace(/\D/g, '')
}

const isEdit = computed(() => !!props.id)

watch(
  () => props.student,
  (newStudent) => {
    if (newStudent) {
      form.value = {
        registrationNumber: newStudent.registrationNumber,
        document: newStudent.document,
        user: {
          name: newStudent.user.name,
          email: newStudent.user.email,
        },
      }
    }
  },
  { immediate: true },
)

const handleSubmit = async () => {
  const { valid } = await formRef.value?.validate()
  if (!valid) return

  if (!!props.id) {
    await studentStore.updateStudent(props.id, form.value)
  } else {
    await studentStore.createStudent(form.value)
  }

  if (studentStore.hasError && studentStore.error) {
    notificationStore.notify(studentStore.error, 'error')
    return
  }

  emit('submit')
}
</script>
