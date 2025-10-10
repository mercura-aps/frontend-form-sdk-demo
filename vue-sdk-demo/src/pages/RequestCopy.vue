<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSubmit } from '../form-sdk';

const route = useRoute();
const router = useRouter();
const requestCopyId = route.params.requestCopyId as string;
const isLoading = ref(true);
const openFromRequestCopy = useSubmit(state => state.openFromRequestCopy);

onMounted(async () => {
  if (requestCopyId) {
    await openFromRequestCopy.value(Number(requestCopyId));
    isLoading.value = false;
  }
});

if (!isLoading.value) {
  router.push('/');
}
</script>

<template>
  <div v-if="isLoading">Loading...</div>
</template>
