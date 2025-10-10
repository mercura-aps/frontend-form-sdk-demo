<script setup lang="ts">
import { useFormCategories } from '../form-sdk';

const categoriesPath = useFormCategories(
  state => state.strategies.breadcrumbs({ homeText: "Home" }).categoriesPath
);
const setCurrentCategory = useFormCategories(
  state => state.strategies.breadcrumbs({ homeText: "Home" }).setCurrentCategory
);
const currentCategory = useFormCategories(
  state => state.strategies.breadcrumbs({ homeText: "Home" }).currentCategory
);
</script>

<template>
  <div class="flex gap-2 pb-4">
    <button
      v-for="category in categoriesPath"
      :key="category.id + '-' + category.level"
      :class="`rounded-md p-2 ${
        currentCategory?.id === category.id ? 'bg-blue-500 text-white' : ''
      }`"
      @click="setCurrentCategory(category)"
    >
      {{ category.name }}
    </button>
  </div>
</template>
