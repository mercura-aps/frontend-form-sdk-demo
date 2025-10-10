<script setup lang="ts">
import { useSubmit } from '../form-sdk';

const submit = useSubmit(state => state.submit);
const isSubmitEnabled = useSubmit(state => state.isSubmitEnabled);
const isLoadingSubmit = useSubmit(state => state.isLoadingSubmit);
const errorSubmit = useSubmit(state => state.errorSubmit);

const handleSubmit = async () => {
  const result = await submit.value();
  if (result.ok) {
    alert("Submitted");
  }
};
</script>

<template>
  <button v-if="!isSubmitEnabled" disabled>Submit not enabled</button>
  <button v-else-if="isLoadingSubmit" disabled>Loading...</button>
  <button v-else @click="handleSubmit">Submit</button>
</template>
