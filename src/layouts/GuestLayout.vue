<template>
  <v-app>
    <v-main>
      <AppLogo />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import AppLogo from '@/components/auth/AppLogo.vue'
</script>
