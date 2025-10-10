<script setup lang="ts">
import type { TGroup, TQuantities, TValues } from '@mercura-aps/frontend-form-sdk';
import { useNumberFormatter } from '../form-sdk';
import SummaryElementRow from './SummaryElementRow.vue';

const props = defineProps<{ 
  group: TGroup; 
  values: TValues; 
  quantities: TQuantities; 
  configId: number;
}>();

const resolveStepPrice = useNumberFormatter(state => state.getResolveStepPrice());
</script>

<template>
    <div class="col-span-2 mt-4 mb-2 border-t border-gray-200 pt-2 text-xl font-semibold text-blue-600">
        {{ group.label }}
    </div>
    <SummaryElementRow 
      v-for="element in group.elements" 
      :key="element.id" 
      :element="element" 
      :values="values" 
      :quantities="quantities" 
      :configId="configId"
    />
    <div class="col-span-2 py-1 font-medium text-gray-600">
        {{ resolveStepPrice?.({ 
          step: group, 
          values, 
          quantities, 
          includedText: "included" 
        }) }}
    </div>
</template>