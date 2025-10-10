<script setup lang="ts">
import type { TCategoriesTree } from '@mercura-aps/frontend-form-sdk';
import { useFormCategories } from '../form-sdk';

interface Props {
  category: TCategoriesTree;
}

defineProps<Props>();

const setCurrentCategory = useFormCategories(
  state => state.strategies.breadcrumbs({ homeText: "Home" }).setCurrentCategory
);
</script>

<template>
  <button
    v-for="category in category.subcategories"
    :key="category.id"
    class="rounded-md bg-blue-500 p-2 text-white"
    @click="setCurrentCategory(category)"
  >
    {{ category.name }}
  </button>
</template>
