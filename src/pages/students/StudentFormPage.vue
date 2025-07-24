<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span class="text-h6 ml-3">{{ !id ? 'Novo estudante' : 'Editar estudante' }}</span>
          </v-card-title>
          <StudentsForm
            :student="student"
            :id="id"
            @submit="handleSubmit"
            @cancel="router.push('/students')"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useStudentsStore } from '@/stores/students'
import { ref, onMounted } from 'vue'
import StudentsForm from '@/components/students/StudentsForm.vue'
import type { Student } from '@/types/student'
import { useNotificationStore } from '@/stores/notification'

const route = useRoute()
const router = useRouter()
const studentStore = useStudentsStore()
const notificationStore = useNotificationStore()

const id = route.params.id as string | undefined
const student = ref<Student>()

onMounted(async () => {
  if (id) {
    student.value = await studentStore.find(id)
  }
})

const handleSubmit = async () => {
  notificationStore.notify('Salvo com sucesso', 'success')
  router.push('/students')
} //TODO handle error
</script>
