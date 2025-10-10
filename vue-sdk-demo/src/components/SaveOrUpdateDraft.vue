<script setup lang="ts">
import { useSubmit } from '../form-sdk';

const saveOrUpdateDraft = useSubmit(state => state.saveOrUpdateDraft);
const isDraftSave = useSubmit(state => state.isDraftSave);
const errorDraft = useSubmit(state => state.errorDraft);
const isLoadingDraft = useSubmit(state => state.isLoadingDraft);
const isDraftEnabled = useSubmit(state => state.isDraftEnabled);
const savedDraftName = useSubmit(state => state.savedDraftName);
const draftId = useSubmit(state => state.draftId);
</script>

<template>
  <button v-if="!isDraftEnabled" disabled>Draft not enabled</button>
  <button v-else-if="isLoadingDraft" disabled>Loading...</button>
  <button v-else @click="saveOrUpdateDraft">
    {{ isDraftSave ? "Save" : `Update ${savedDraftName} #${draftId}` }}
  </button>
</template>
