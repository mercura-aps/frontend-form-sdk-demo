<script setup lang="ts">
import { useConfigs, useForms } from '../form-sdk';

const forms = useForms(state => state.paginatedFormsData.data);
const isLoading = useForms(state => state.paginatedFormsData.isLoading);
const addConfig = useConfigs(state => state.addConfig);
const configsCounter = useConfigs(state => state.configsCounter);
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <button
    v-for="form in forms?.data"
    :key="form.id"
    class="rounded-md bg-blue-500 p-2 text-white"
    @click="addConfig({
      configQuantity: 1,
      formId: form.id,
      name: `Config ${configsCounter + 1}`,
      formName: form.name
    })"
  >
    {{ form.name }}
  </button>
</template>
