<script setup lang="ts">
import { useConfigs } from '../form-sdk';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const configs = useConfigs(state => state.configs);

const currentConfigIndex = computed(() => configs.value.findIndex(config => config.id === Number(route.params.configId)));
const previousConfigId = computed(() => configs.value[currentConfigIndex.value - 1]?.id);
const nextConfigId = computed(() => configs.value[currentConfigIndex.value + 1]?.id);

</script>

<template>
    <div class="flex w-full gap-2">
        <router-link v-if="previousConfigId" :to="`/config/${previousConfigId}`" class="my-8 flex rounded-md bg-blue-500 p-2 text-white">
            Previous
        </router-link>
        <router-link v-if="nextConfigId" :to="`/config/${nextConfigId}`" class="my-8 flex rounded-md bg-blue-500 p-2 text-white">
            Next
        </router-link>
        <router-link v-else to="/checkout" class="my-8 flex rounded-md bg-blue-500 p-2 text-white">
            Checkout
        </router-link>
    </div>
</template>