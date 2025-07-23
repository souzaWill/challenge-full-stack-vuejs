<template>
  <v-snackbar :model-value="show" :timeout="timeout" :color="color" location="bottom center">
    {{ message }}
  </v-snackbar>
</template>

<script lang="ts" setup>
const { show, timeout, message, color } = defineProps<{
  show: boolean
  timeout: string
  message: string
  color: 'success' | 'error' | 'info' | 'warning' //TODO
}>()
</script>
