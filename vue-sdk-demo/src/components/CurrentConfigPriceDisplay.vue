<script setup lang="ts">
import { useConfigs, useNumberFormatter } from '../form-sdk';

const currentConfigId = useConfigs(state => state.currentConfigId);
const configPriceFormatter = useNumberFormatter(state => state.getResolvedConfigPrice({
    configId: currentConfigId.value ?? -1,
    multiplyConfigQuantity: false,
    includedText: "included",
}));


</script>

<template>
    <div v-if="currentConfigId && currentConfigId !== -1" class="flex flex-col gap-2 rounded-md border p-2">
        {{ configPriceFormatter }}
    </div>
</template>