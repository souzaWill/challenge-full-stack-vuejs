<template>
  <v-text-field
    v-model="search"
    append-inner-icon="mdi-magnify"
    density="compact"
    :placeholder="placeholder || 'Digite sua busca...'"
    variant="solo"
    hide-details
    single-line
    @keyup.enter="emit('handleSearch', search)"
    @click:append-inner="emit('handleSearch', search)"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  placeholder?: string
}>()

const search = ref('')

const emit = defineEmits<{
  (e: 'handleSearch', searchValue: string): void
}>()
</script>
