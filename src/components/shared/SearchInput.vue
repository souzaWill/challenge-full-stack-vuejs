<template>
  <v-text-field
    v-model="search"
    append-inner-icon="mdi-magnify"
    density="compact"
    placeholder="Enter your search"
    variant="solo"
    hide-details
    single-line
    @keyup.enter="emit('handleSearch')"
    @click:append-inner="emit('handleSearch')"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'

const search = ref('')

const emit = defineEmits<{
  (e: 'handleSearch'): void
}>()
</script>
