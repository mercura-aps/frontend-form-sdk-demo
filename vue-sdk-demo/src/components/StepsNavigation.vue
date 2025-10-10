<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useConfigs, useFormByCurrentConfigId } from '../form-sdk';

const route = useRoute();
const configs = useConfigs(state => state.configs);
const configId = computed(() => Number(route.params.configId));
const configStatus = computed(() => configs.value.find(config => config.id === configId.value)?.status);

const steps = useFormByCurrentConfigId(state => state.steps);
const setCurrentProgress = useFormByCurrentConfigId(state => state.setCurrentProgress);
const currentProgress = useFormByCurrentConfigId(state => state.currentProgress);
const stepsAvailability = useFormByCurrentConfigId(state => state.stepsAvailability);

</script>

<template>
    <div class="grid grid-cols-1">
        <div>{{ configStatus }}</div>
        <div v-for="(step, i) in steps" :key="step?.id">
        <button
            v-if="step"
            :key="step?.id"
            :class="`rounded-md p-2 text-left disabled:bg-gray-500 ${
                currentProgress === i ? 'bg-blue-500 text-white' : ''
            }`"
            :disabled="!stepsAvailability?.[i]"
            @click="() => setCurrentProgress?.(i)"
        >
            {{ step?.label }}
        </button>
        </div>
    </div>
</template>