<script setup lang="ts">
import { useFormCategories } from '../form-sdk';

const setCurrentCategory = useFormCategories(
  state => state.strategies.filter({ allText: "All" }).setCurrentCategory
);
const categoriesPath = useFormCategories(
  state => state.strategies.filter({ allText: "All" }).categoriesPath
);
const isSelectedCategory = useFormCategories(
  state => state.strategies.filter({ allText: "All" }).isSelectedCategory
);
</script>

<template>
  <div class="flex flex-col gap-2">
    <div v-for="category in categoriesPath" :key="category.id" class="flex gap-2">
      <button
        v-for="subcategory in category.subcategories"
        :key="subcategory.id"
        :class="isSelectedCategory(subcategory) ? 'bg-blue-500 text-white' : ''"
        @click="setCurrentCategory(subcategory)"
      >
        {{ subcategory.name }}
      </button>
    </div>
  </div>
</template>
