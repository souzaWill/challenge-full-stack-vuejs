<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLoading from './components/shared/AppLoading.vue'
import { useLoadingStore } from './stores/loading'

const loadingStore = useLoadingStore()
</script>

<template>
  <AppLoading :show="loadingStore.loading" />
  <RouterView />
</template>
