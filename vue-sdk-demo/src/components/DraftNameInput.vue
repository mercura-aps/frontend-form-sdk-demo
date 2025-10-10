<script setup lang="ts">
import { useSubmit } from '../form-sdk';

const draftName = useSubmit(state => state.draftName);
const setDraftName = useSubmit(state => state.setDraftName);
</script>

<template>
  <input
    type="text"
    :value="draftName"
    @input="setDraftName(($event.target as HTMLInputElement).value)"
  />
</template>
