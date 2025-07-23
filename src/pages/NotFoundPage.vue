<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center text-center">
    <v-icon size="80" color="error">mdi-alert-circle-outline</v-icon>
    <h1 class="text-h2 mt-4">404</h1>
    <p class="text-subtitle-1 mb-6">Página não encontrada</p>

    <v-btn color="primary" variant="flat" @click="goHome"> Voltar para a página inicial </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/students')
}
</script>
