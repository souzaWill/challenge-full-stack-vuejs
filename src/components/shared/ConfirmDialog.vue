<template>
  <v-dialog :model-value="show" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">{{ title }}</v-card-title>
      <v-card-text>{{ text }}</v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="emit('cancel')">{{ 'Cancel' }}</v-btn>
        <v-btn color="blue darken-1" text @click="emit('confirm')">{{ 'Confirm' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean
  title: string
  text: string
}>()

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>
