<script setup lang="ts">
import { useFormCategories } from '../form-sdk';
import CategoriesBreadcrumb from './CategoriesBreadcrumb.vue';
import CurrentCategories from './CurrentCategories.vue';
import FormCards from './FormCards.vue';

const currentCategory = useFormCategories(
  state => state.strategies.breadcrumbs({ homeText: "Home" }).currentCategory
);
const shouldShowForms = useFormCategories(
  state => state.strategies.breadcrumbs({ homeText: "Home" }).shouldShowForms
);
</script>

<template>
  <div>
    <h1>Forms</h1>
    <CategoriesBreadcrumb />
    <div class="grid grid-cols-3 gap-2">
      <FormCards v-if="shouldShowForms" />
      <CurrentCategories v-else :category="currentCategory" />
    </div>
  </div>
</template>
