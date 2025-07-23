<template>
  <v-toolbar color="white" class="mb-4" flat>
    <v-toolbar-title class="text-h6">{{ title }}</v-toolbar-title>
  </v-toolbar>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
