<template>
  <div class="text-center mt-4">
    <div class="text-body-2 mb-1">Já possui uma conta?</div>
    <v-btn variant="text" color="primary" @click="redirect"> Entrar </v-btn>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function redirect() {
  router.push('/login')
}
</script>
