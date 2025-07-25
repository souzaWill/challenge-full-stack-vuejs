<template>
  <v-data-table-server
    :headers="headers"
    :items="items"
    v-bind:items-per-page="itemsPerPage"
    :items-length="itemsLength"
    :loading="loading"
    @update:options="(options) => emit('update:options', options)"
  >
    <template v-for="(slotFn, name) in $slots" #[name]="slotProps" :key="name">
      <component :is="slotFn" v-bind="slotProps" />
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import type { DataTableHeader } from 'vuetify'

const emit = defineEmits<{
  (e: 'update:options', value: any): void
}>()

defineProps<{
  headers: DataTableHeader[]
  items: any[]
  itemsLength: number
  itemsPerPage: number
  loading: boolean
}>()
</script>
