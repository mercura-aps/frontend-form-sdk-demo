<script setup lang="ts">
import type { TElement } from '@mercura-aps/frontend-form-sdk';
import { useRoute } from 'vue-router';
import { useFormByCurrentConfigId, useNumberFormatter, useValuesByCurrentConfigId } from '../form-sdk';
import MessageDisplay from './MessageDisplay.vue';

const props = defineProps<{ element: TElement }>();

const values = useValuesByCurrentConfigId(state => state.values);
const handleChangeInput = useValuesByCurrentConfigId(state => state.handleChangeInput);
const resolveOptionPrice = useNumberFormatter(state => state.getResolveOptionPrice());
const route = useRoute();
const configId = Number(route.params.configId);

const hasOptions = (element: TElement): element is TElement & { options: any[] } => {
    return 'options' in element;
};

const messages = useFormByCurrentConfigId(state => state.messages.elements[props.element.id]);

</script>

<template>
    <div class="flex flex-1 flex-col gap-2 rounded-md border p-2 relative">
        <div v-if="messages?.length" class="sticky top-0 flex flex-col gap-1">
            <MessageDisplay
                v-for="(message, index) in messages"
                :key="`${message.type}-${message.message}-${index}`"
                :message="message"
            />
        </div>
        <div>
            {{ props.element.label }} {{ props.element.state === 'required' ? '*' : '' }}
        </div>
        
        <div v-if="hasOptions(element)">
            <select
                v-if="element.type === 'select'"
                :value="values?.[element.id]?.[0] ?? ''"
                @change="handleChangeInput?.({ type: element.type, elementId: element.id, optionIdOrValue: ($event.target as HTMLSelectElement).value })"
            >
                <option v-for="option in element.options" :key="option.id" :value="option.id">
                    {{ option.name }} - 
                    {{ resolveOptionPrice?.({ element, option, includedText: 'included' }) }}
                </option>
            </select>
            
            <label v-else v-for="option in element.options" :key="option.id" class="flex items-center gap-2 rounded-md border p-2">
                <img :src="option.image ?? ''" class="h-10 w-10" />
                {{ option.name }} - 
                {{ resolveOptionPrice?.({ element, option, includedText: 'included' }) }}
                <input
                    :type="element.type"
                    :value="option.id"
                    :checked="values?.[element.id]?.includes(option.id.toString())"
                    @change="handleChangeInput?.({ type: element.type, elementId: element.id, optionIdOrValue: option.id })"
                />
            </label>
        </div>

        <input
            v-else
            :type="element.type"
            class="rounded-md border p-2"
            :value="values?.[element.id]?.[0] ?? (element.type === 'text' ? '' : 0)"
            @change="handleChangeInput?.({ type: element.type, elementId: element.id, optionIdOrValue: ($event.target as HTMLInputElement).value })"
        />
    </div>
</template>