<template>
  <v-icon class="me-2" size="small" @click="emit('edit', item)"> mdi-pencil </v-icon>
  <v-icon size="small" @click="emit('delete', item)"> mdi-delete </v-icon>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'edit', item: any): void
  (e: 'delete', item: any): void
}>()

const { item } = defineProps<{
  item: any
}>()
</script>
