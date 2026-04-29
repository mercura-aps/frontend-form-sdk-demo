<script setup lang="ts">
import type { TGroup } from '@mercura-aps/frontend-form-sdk';
import { useFormByCurrentConfigId } from '../form-sdk';
import ElementDisplay from './ElementDisplay.vue';
import MessageDisplay from './MessageDisplay.vue';

const props = defineProps<{ group: TGroup }>();

const messages = useFormByCurrentConfigId(state => state.messages.groups[props.group.id]);
</script>

<template>
    <div class="flex-1 rounded-md border p-2 relative">
        <div v-if="messages?.length" class="sticky top-0 flex flex-col gap-1">
            <MessageDisplay
                v-for="(message, index) in messages"
                :key="`${message.type}-${message.message}-${index}`"
                :message="message"
            />
        </div>
        <div>{{ group.label }}</div>
        <div class="grid grid-cols-1 gap-2">
            <ElementDisplay v-for="element in group.elements" :key="element.id" :element="element" />
        </div>
    </div>
</template>