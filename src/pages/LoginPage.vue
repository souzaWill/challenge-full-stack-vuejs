<template>
  <div>
    <v-img class="mx-auto my-6" max-width="228" src="../assets/logo.svg" />

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <form>
        <div class="text-subtitle-1 text-medium-emphasis">Email</div>

        <v-text-field density="compact" prepend-inner-icon="mdi-email-outline" variant="outlined" />

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password
        </div>

        <v-text-field
          type="text"
          density="compact"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
        />
        <v-btn type="submit" block class="mb-8" color="blue" size="large" variant="tonal">
          Log in
        </v-btn>
      </form>
    </v-card>
  </div>
</template>

<script setup lang="ts"></script>
