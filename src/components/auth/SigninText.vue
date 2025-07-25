<template>
  <div class="text-center mt-4">
    <div class="text-body-2 mb-1">Ainda não tem uma conta?</div>
    <v-btn variant="text" color="primary" @click="redirect"> Cadastre-se </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function redirect() {
  router.push('/signin') // ajuste a rota conforme seu projeto
}
</script>
