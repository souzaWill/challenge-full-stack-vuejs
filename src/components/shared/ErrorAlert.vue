<template>
  <v-alert :text="message" v-if="message" type="error" class="mb-4" />
</template>

<script setup lang="ts">
const { message } = defineProps<{
  message: string | null
}>()
</script>
