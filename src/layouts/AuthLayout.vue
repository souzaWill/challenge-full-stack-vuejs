<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="toggle"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ 'Gereciamento de Matriculas +A Educacao' }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="logout"> Logout </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" color="primary lighten-4">
      <v-list>
        <v-list-item link @click="navigate('/')">
          <v-list-item-title>{{ 'Alunos' }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const drawer = ref(true)
const authStore = useAuthStore()

const logout = async () => {
  authStore.logout()
  router.push({ path: '/login' })
}

const toggle = () => {
  drawer.value = !drawer.value
}

const navigate = (route: string) => {
  router.push(route)
}
</script>
