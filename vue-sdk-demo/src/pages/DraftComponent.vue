<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useConfigs, useSubmit } from '../form-sdk';

const route = useRoute();
const router = useRouter();
const draftId = route.params.draftId as string;
const isLoading = ref(false);
const openFromDraft = useSubmit(state => state.openFromDraft);
const firstConfigId = useConfigs(state => state.configs[0]?.id);

onMounted(async () => {
  if (draftId) {
    isLoading.value = true;
    await openFromDraft.value(Number(draftId));
    isLoading.value = false;
  }
});

if (isLoading.value) {
  // Loading state handled in template
} else if (!firstConfigId) {
  // No config found - handled in template
} else {
  router.push('/');
}
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="!firstConfigId">No config found</div>
</template>
