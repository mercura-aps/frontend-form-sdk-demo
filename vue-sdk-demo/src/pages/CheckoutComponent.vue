<script setup lang="ts">
import { computed, ref } from 'vue';
import ContactDetails from '../components/ContactDetails.vue';
import GroupSummary from '../components/GroupSummary.vue';
import Submit from '../components/SubmitComponent.vue';
import SummaryElementRow from '../components/SummaryElementRow.vue';
import { useFinishedConfigs, useNumberFormatter } from '../form-sdk';

const finishedConfigs = useFinishedConfigs(state => state.getFinishedConfigs());
const currentFinishedConfigIndex = ref(0);
const currentFinishedConfig = computed(() => finishedConfigs.value[currentFinishedConfigIndex.value]);

const configPrice = useNumberFormatter(state => 
  state.getResolvedConfigPrice({
    configId: currentFinishedConfig.value?.config.id ?? -1,
    multiplyConfigQuantity: true,
    includedText: "included",
  })
);
</script>

<template>
    <div class="min-h-screen bg-gray-50 p-4">
        <ContactDetails />
        <h2 class="mb-6 text-center text-3xl font-bold text-gray-800">
            Configuration Summary
        </h2>
        <div class="mb-8 flex justify-center gap-3">
            <button
                v-for="(finishedConfig, index) in finishedConfigs"
                :key="finishedConfig.config.id"
                :class="`rounded-lg px-6 py-3 text-white shadow-md transition-all duration-200 ease-in-out ${
                    currentFinishedConfigIndex === index
                        ? 'scale-105 bg-red-600 font-semibold hover:bg-red-700'
                        : 'bg-blue-500 hover:bg-blue-600'
                }`"
                @click="currentFinishedConfigIndex = index"
            >
                {{ finishedConfig.config.name }}
            </button>
        </div>
        <div v-if="currentFinishedConfig" class="mx-auto mt-6 max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
            <h3 class="mb-6 text-center text-2xl font-semibold text-blue-700">
                {{ currentFinishedConfig.config.name }} - {{ currentFinishedConfig.config.formName }} - Details
            </h3>
            <div class="grid grid-cols-2 items-baseline gap-x-6 gap-y-4">
                <div class="col-span-1 border-b-2 border-blue-200 pb-3 text-lg font-bold text-gray-700">
                    Component
                </div>
                <div class="col-span-1 border-b-2 border-blue-200 pb-3 text-lg font-bold text-gray-700">
                    Selected Value
                </div>

                <template v-for="step in currentFinishedConfig.stepsWithSelections" :key="step.id">
                    <GroupSummary 
                        v-if="'elements' in step" 
                        :group="step" 
                        :values="currentFinishedConfig.values" 
                        :quantities="currentFinishedConfig.quantities" 
                        :configId="currentFinishedConfig.config.id"
                    />
                    <template v-else>
                        <div class="col-span-2 mt-4 mb-2 border-t border-gray-200 pt-2 text-xl font-semibold text-blue-600">
                            {{ step.label }}
                        </div>
                        <SummaryElementRow 
                            :element="step" 
                            :values="currentFinishedConfig.values" 
                            :quantities="currentFinishedConfig.quantities" 
                            :configId="currentFinishedConfig.config.id"
                        />
                    </template>
                </template>
                <div class="col-span-2 py-1 font-medium text-gray-600">
                    {{ configPrice }}
                </div>
            </div>
        </div>
        <p v-else class="mt-8 text-center text-lg text-gray-600">
            Select a configuration to view its detailed summary.
        </p>
        <Submit />
    </div>
</template>