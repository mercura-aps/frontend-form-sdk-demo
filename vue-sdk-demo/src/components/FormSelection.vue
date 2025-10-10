<script setup lang="ts">
import { ref } from 'vue';
import FormSelectionBreadcrumb from './FormSelectionBreadcrumb.vue';
import FormSelectionFilter from './FormSelectionFilter.vue';

const strategy = ref<"breadcrumb" | "filter">("breadcrumb");
</script>

<template>
  <div>
    <div class="flex gap-2">
      <label class="flex items-center gap-2">
        Breadcrumb
        <input
          type="radio"
          name="strategy"
          value="breadcrumb"
          :checked="strategy === 'breadcrumb'"
          @change="strategy = 'breadcrumb'"
        />
      </label>
      <label class="flex items-center gap-2">
        Filter
        <input
          type="radio"
          name="strategy"
          value="filter"
          :checked="strategy === 'filter'"
          @change="strategy = 'filter'"
        />
      </label>
    </div>
    <FormSelectionBreadcrumb v-if="strategy === 'breadcrumb'" />
    <FormSelectionFilter v-else />
  </div>
</template>
