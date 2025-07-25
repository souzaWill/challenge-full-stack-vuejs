<template>
  <v-dialog :model-value="props.show" max-width="500px">
    <v-card>
      <v-card-title class="text-h5">{{ props.title }}</v-card-title>
      <v-card-text>{{ props.text }}</v-card-text>
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="emit('cancel')">Cancelar</v-btn>
        <v-btn color="red darken-1" text @click="emit('confirm')">Confirmar</v-btn>
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
