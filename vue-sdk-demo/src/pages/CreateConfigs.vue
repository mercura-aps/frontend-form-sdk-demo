<script setup lang="ts">
import DraftNameInput from '../components/DraftNameInput.vue';
import FormSelection from '../components/FormSelection.vue';
import { useConfigs } from '../form-sdk';

const configs = useConfigs(state => state.configs);
const removeConfig = useConfigs(state => state.removeConfig);
const updateConfig = useConfigs(state => state.updateConfig);
</script>

<template>
    <div class="grid grid-cols-2 gap-2">
        <div>
            <h1>Create Configs</h1>
            <DraftNameInput />
            <div class="m-2 flex flex-col gap-2 rounded-md border p-2">
                <div v-for="config in configs" :key="config.id" class="flex items-center justify-between gap-2 rounded-md bg-blue-500 p-2 text-white">
                    <div class="flex gap-2">
                        <div>{{ config.name }}</div>
                        <div>
                            <button @click="updateConfig(config.id, { configQuantity: config.configQuantity - 1 })">-</button>
                            {{ config.configQuantity }}
                            <button @click="updateConfig(config.id, { configQuantity: config.configQuantity + 1 })">+</button>
                        </div>
                        <div>{{ config.formName }}</div>
                        <div>{{ config.status }}</div>
                    </div>
                    <button class="rounded-md bg-red-500 p-2 text-white" @click="removeConfig(config.id)">
                        Remove
                    </button>
                </div>
            </div>
        </div>
        <FormSelection />
        <router-link :to="`/config/${configs[0]?.id ?? 0}`">Continue</router-link>
    </div>
</template>