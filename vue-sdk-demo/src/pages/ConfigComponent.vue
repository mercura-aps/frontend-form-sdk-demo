<script setup lang="ts">
import { onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import ConfigsNavigation from '../components/ConfigsNavigation.vue';
import ElementDisplay from '../components/ElementDisplay.vue';
import GroupDisplay from '../components/GroupDisplay.vue';
import StepsNavigation from '../components/StepsNavigation.vue';
import { useConfigs, useFormByCurrentConfigId } from '../form-sdk';


const route = useRoute();
const setCurrentConfigId = useConfigs(state => state.setCurrentConfigId);

watch(() => route.params.configId, (newConfigId) => {
    if (!newConfigId) {
        setCurrentConfigId.value(-1);
        return;
    }
    setCurrentConfigId.value(Number(newConfigId));
}, { immediate: true });

onUnmounted(() => {
    setCurrentConfigId.value(-1);
});

const setNextCurrentStep = useFormByCurrentConfigId(state => state.setNextCurrentStep);
const currentStep = useFormByCurrentConfigId(state => state.currentStep);
const isCurrentStepFinished = useFormByCurrentConfigId(state => state.isCurrentStepFinished);

</script>

<template>
    <div>
        <div class="flex gap-2">
            <div>
                <StepsNavigation />
            </div>
            <div v-if="currentStep">
                <button
                    class="rounded-md bg-blue-500 p-2 disabled:bg-gray-500"
                    :disabled="!isCurrentStepFinished"
                    @click="setNextCurrentStep"
                >
                    Next step
                </button>
                <GroupDisplay v-if="'elements' in currentStep" :group="currentStep" />
                <ElementDisplay v-else :element="currentStep" />
            </div>
        </div>
        <ConfigsNavigation />
    </div>
</template>