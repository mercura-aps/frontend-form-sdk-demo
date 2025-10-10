<script setup lang="ts">
import CurrentCategoriesFilter from './CurrentCategoriesFilter.vue';
import FormCards from './FormCards.vue';
</script>

<template>
  <div>
    <h1>Forms</h1>
    <CurrentCategoriesFilter />
    <div class="grid grid-cols-3 gap-2">
      <FormCards />
    </div>
  </div>
</template>
