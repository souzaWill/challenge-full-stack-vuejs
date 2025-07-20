<template>
  <v-app>
    <v-app-bar color="primary" app>
      <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

      <v-toolbar-title>Alunos</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app>
      <!-- Menu lateral -->
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
