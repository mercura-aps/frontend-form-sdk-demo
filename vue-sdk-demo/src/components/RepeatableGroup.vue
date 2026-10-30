<script setup lang="ts">
import type { TRepeatableGroup } from '@mercura-aps/frontend-form-sdk';
import { computed, ref } from 'vue';
import { useFormByCurrentConfigId } from '../form-sdk';
import GroupDisplay from './GroupDisplay.vue';
import MessageDisplay from './MessageDisplay.vue';
import {
    canAddRepeatableInstance,
    canRemoveRepeatableInstance,
    repeatableLimits,
} from './repeatableLimits';

const props = defineProps<{ group: TRepeatableGroup }>();

const openInstances = ref<Record<string, boolean>>({});
const pendingRemove = ref<{ instanceId: string; displayName: string } | null>(null);

const messages = useFormByCurrentConfigId(state => state.messages.groups[props.group.id]);
const addRepeatableInstance = useFormByCurrentConfigId(state => state.addRepeatableInstance);
const removeRepeatableInstance = useFormByCurrentConfigId(state => state.removeRepeatableInstance);

const limitsGroup = computed(() => repeatableLimits(props.group));
const canAdd = computed(() => canAddRepeatableInstance(limitsGroup.value));
const canRemove = computed(() => canRemoveRepeatableInstance(limitsGroup.value));

function isOpen(instanceId: string) {
    return openInstances.value[instanceId] ?? true;
}

function toggle(instanceId: string) {
    openInstances.value = {
        ...openInstances.value,
        [instanceId]: !isOpen(instanceId),
    };
}

function confirmRemove() {
    if (!pendingRemove.value || !removeRepeatableInstance.value) {
        return;
    }
    removeRepeatableInstance.value(props.group.id, pendingRemove.value.instanceId);
    pendingRemove.value = null;
}
</script>

<template>
    <div class="relative flex flex-1 flex-col gap-3 rounded-md border p-2">
        <div v-if="messages?.length" class="sticky top-0 flex flex-col gap-1">
            <MessageDisplay
                v-for="(message, index) in messages"
                :key="`${message.type}-${message.message}-${index}`"
                :message="message"
            />
        </div>
        <div class="flex items-center justify-between gap-2">
            <div class="text-lg font-medium">{{ group.label }}</div>
            <button
                v-if="canAdd && addRepeatableInstance"
                type="button"
                class="rounded-md bg-blue-500 px-3 py-2 text-white"
                @click="addRepeatableInstance(group.id)"
            >
                Add item
            </button>
        </div>
        <p v-if="group.description" class="text-sm text-gray-600">{{ group.description }}</p>
        <p v-if="group.instances.length === 0" class="py-6 text-center text-gray-600">No items yet</p>
        <div
            v-for="(instance, index) in group.instances"
            :key="instance.instanceId"
            class="rounded-md border"
            :data-instance-id="instance.instanceId"
        >
            <div class="flex items-center justify-between gap-2 bg-gray-50 px-2 py-2">
                <button type="button" class="min-w-0 flex-1 text-left font-medium" @click="toggle(instance.instanceId)">
                    {{ group.label }} {{ index + 1 }}
                </button>
                <button
                    v-if="canRemove"
                    type="button"
                    class="rounded-md bg-red-500 px-2 py-1 text-white"
                    @click="pendingRemove = { instanceId: instance.instanceId, displayName: `${group.label} ${index + 1}` }"
                >
                    Remove
                </button>
            </div>
            <GroupDisplay
                v-if="isOpen(instance.instanceId)"
                :group="instance.group"
                :show-label="false"
                :show-messages="false"
            />
        </div>
        <div v-if="pendingRemove" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 class="text-lg font-semibold">Are you sure?</h2>
                <p class="mt-2 text-gray-600">
                    {{ pendingRemove.displayName }} will be removed along with its values.
                </p>
                <div class="mt-6 flex justify-end gap-3">
                    <button type="button" class="rounded-md bg-gray-200 px-4 py-2" @click="pendingRemove = null">
                        Cancel
                    </button>
                    <button type="button" class="rounded-md bg-red-500 px-4 py-2 text-white" @click="confirmRemove">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
