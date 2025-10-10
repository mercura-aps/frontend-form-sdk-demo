<script setup lang="ts">
import Header from './components/HeaderComponent.vue';
</script>

<template>
  <main class="relative min-h-screen px-4 pb-4">
    <Header />
    <router-view></router-view>
  </main>
</template>