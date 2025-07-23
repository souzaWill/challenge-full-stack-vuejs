<template>
  <v-overlay :model-value="show" class="align-center justify-center">
    <v-progress-circular indeterminate color="primary" size="64" />
  </v-overlay>
</template>

<script setup lang="ts">
const { show } = defineProps<{
  show: boolean
}>()
</script>
