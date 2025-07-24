<template>
  <v-col cols="12">
    <v-card>
      <PageHeader title="Lista de estudantes" />
      <v-card-text>
        <v-row>
          <v-col align-self="start" cols="12" sm="8">
            <SearchInput @handle-search="loadStudents"></SearchInput>
          </v-col>
          <v-col align-self="end" cols="12" sm="4" class="mt-sm-0 mt-2">
            <CreateButton
              label="Novo"
              icon="mdi-plus"
              color="blue"
              size="large"
              variant="tonal"
              @click="redirectToCreate"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <ServerTable
              :headers="headers"
              :items="studentsStore.students"
              :items-length="studentsStore.totalItems"
              :items-per-page="studentsStore.itemsPerPage"
              :loading="loadingStore.loading"
              @update:options="loadStudents"
            >
              <template #item.document="{ item }">
                {{ formatCPF(item.document) }}
              </template>
              <template #item.actions="{ item }">
                <TableRowActions
                  :item="item"
                  @delete="openConfirmDeleteDialog"
                  @edit="redirectToEdit(item)"
                />
              </template>
            </ServerTable>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
  <ConfirmDialog
    :show="confirmDeleteDialog"
    title="Excluir estudante"
    text="Você tem certeza que deseja excluir o estudante?"
    @confirm="handleDeleteStudent"
    @cancel="closeConfirmDeleteDialog"
  />
</template>

<script setup lang="ts">
import ConfirmDialog from '@/components/shared/ConfirmDialog.vue'
import CreateButton from '@/components/shared/CreateButton.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
import SearchInput from '@/components/shared/SearchInput.vue'
import ServerTable from '@/components/shared/ServerTable.vue'
import TableRowActions from '@/components/shared/TableRowActions.vue'
import { useStudentsStore } from '@/stores/students'
import { useLoadingStore } from '@/stores/loading'
import type { Student } from '@/types/student'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { DataTableHeader } from 'vuetify'
import { useNotificationStore } from '@/stores/notification'
import { formatCPF } from '@/utils/mask'

const headers: DataTableHeader[] = [
  { title: 'RA', align: 'start', key: 'registrationNumber' },
  { title: 'Name', align: 'start', key: 'user.name' },
  { title: 'Email', align: 'start', key: 'user.email' },
  { title: 'Document', align: 'start', key: 'document' },
  { title: 'Actions', key: 'actions', align: 'start', sortable: false },
]

const confirmDeleteDialog = ref(false)
const studentToDelete = ref<Student | null>(null)

const studentsStore = useStudentsStore()
const loadingStore = useLoadingStore()
const notificationStore = useNotificationStore()

const router = useRouter()

const loadStudents = async (options?: any) => {
  await studentsStore.fetchStudents(options)

  if (studentsStore.hasError) {
    notificationStore.notify(studentsStore.error, 'error')
  }
}

const handleDeleteStudent = async () => {
  if (studentToDelete.value?.id != null) {
    await studentsStore.deleteStudent(studentToDelete.value?.id)
    closeConfirmDeleteDialog()
    if (studentsStore.hasError) {
      notificationStore.notify(studentsStore.error, 'error')
      return
    }
    notificationStore.notify('Deletado com sucesso', 'success')
  }
  studentToDelete.value = null
}

const redirectToCreate = () => {
  router.push('/students/create')
}

const redirectToEdit = (item: Student) => {
  router.push(`/students/${item.id}/edit`)
}

const closeConfirmDeleteDialog = () => {
  studentToDelete.value = null
  confirmDeleteDialog.value = false
}

const openConfirmDeleteDialog = (student: Student) => {
  studentToDelete.value = student
  confirmDeleteDialog.value = true
}
</script>
