<template>
  <v-btn :color="color" :variant="variant" :size="size" class="mb-8" block @click="$emit('click')">
    <v-icon start v-if="icon">{{ icon }}</v-icon>
    {{ label }}
  </v-btn>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
  icon?: string
  color?: string
  size?: string
  variant?: 'tonal' | 'outlined' | 'flat' | 'elevated'
}>()
</script>
