<script setup lang="ts">
import type { TElement, TQuantities, TValues } from '@mercura-aps/frontend-form-sdk';
import { hasOptions } from '@mercura-aps/frontend-form-sdk';
import { computed } from 'vue';
import { useNumberFormatter } from '../form-sdk';

const props = defineProps<{ element: TElement, values: TValues, configId: number, quantities: TQuantities }>();

const resolveOptionPriceWithQuantities = useNumberFormatter(state => state.getResolveOptionPriceWithQuantities());
const resolveElementPrice = useNumberFormatter(state => state.getResolveElementPrice());

const valueDisplay = computed(() => {
    const selectedValue = props.values[props.element.id];
    if (hasOptions(props.element) && Array.isArray(props.element.options)) {
        const selectedOption = props.element.options
            .map(
                (option) =>
                    `${option.name} - ${resolveOptionPriceWithQuantities.value?.({
                            element: props.element,
                            option,
                            elementQuantities: props.quantities[props.element.id] ?? {},
                            includedText: "included",
                    })}`,
            )
            .toString();
        return selectedOption ? selectedOption : "N/A (Option not found)";
    }
    return selectedValue !== undefined && selectedValue !== null
        ? String(selectedValue)
        : "N/A (No value)";
});

</script>

<template>
    <div class="col-span-1 py-1 pl-4 text-gray-800">{{ element.label }}</div>
    <div class="col-span-1 py-1 font-medium text-gray-600">
        {{ valueDisplay }}
    </div>
    <div class="col-span-2 py-1 font-medium text-gray-600">
        {{ resolveElementPrice?.({ element, values, quantities, includedText: 'included' }) }}
    </div>
</template>