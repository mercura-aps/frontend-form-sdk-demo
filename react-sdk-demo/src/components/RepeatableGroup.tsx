import type { TRepeatableGroup } from "@mercura-aps/frontend-form-sdk";
import { useState } from "react";
import { useFormByCurrentConfigId } from "../form-sdk";
import GroupDisplay from "./GroupDisplay";
import MessageDisplay from "./MessageDisplay";
import {
    canAddRepeatableInstance,
    canRemoveRepeatableInstance,
    repeatableLimits,
} from "./repeatableLimits";

type PendingRemove = {
    instanceId: string;
    displayName: string;
};

export default function RepeatableGroup({
    group,
}: {
    group: TRepeatableGroup;
}) {
    const [openInstances, setOpenInstances] = useState<Record<string, boolean>>(
        {}
    );
    const [pendingRemove, setPendingRemove] = useState<PendingRemove | null>(
        null
    );
    const messages = useFormByCurrentConfigId(
        (state) => state.messages.groups[group.id]
    );
    const addRepeatableInstance = useFormByCurrentConfigId(
        (state) => state.addRepeatableInstance
    );
    const removeRepeatableInstance = useFormByCurrentConfigId(
        (state) => state.removeRepeatableInstance
    );

    const limitsGroup = repeatableLimits(group);
    const canAdd = canAddRepeatableInstance(limitsGroup);
    const canRemove = canRemoveRepeatableInstance(limitsGroup);

    const confirmRemove = () => {
        if (!pendingRemove || !removeRepeatableInstance) {
            return;
        }
        removeRepeatableInstance(group.id, pendingRemove.instanceId);
        setPendingRemove(null);
    };

    return (
        <div className="relative flex flex-1 flex-col gap-3 rounded-md border p-2">
            {messages?.length ? (
                <div className="sticky top-0">
                    <div className="flex flex-col gap-1">
                        {messages.map((message, index) => (
                            <MessageDisplay
                                key={`${message.type}-${message.message}-${index}`}
                                message={message}
                            />
                        ))}
                    </div>
                </div>
            ) : null}
            <div className="flex items-center justify-between gap-2">
                <div className="text-lg font-medium">{group.label}</div>
                {canAdd && addRepeatableInstance ? (
                    <button
                        type="button"
                        className="rounded-md bg-blue-500 px-3 py-2 text-white"
                        onClick={() => addRepeatableInstance(group.id)}
                    >
                        Add item
                    </button>
                ) : null}
            </div>
            {group.description ? (
                <p className="text-sm text-gray-600">{group.description}</p>
            ) : null}
            {group.instances.length === 0 ? (
                <p className="py-6 text-center text-gray-600">No items yet</p>
            ) : (
                group.instances.map((instance, index) => {
                    const isOpen = openInstances[instance.instanceId] ?? true;
                    const displayName = `${group.label} ${index + 1}`;
                    return (
                        <div
                            key={instance.instanceId}
                            className="rounded-md border"
                            data-instance-id={instance.instanceId}
                        >
                            <div className="flex items-center justify-between gap-2 bg-gray-50 px-2 py-2">
                                <button
                                    type="button"
                                    className="min-w-0 flex-1 text-left font-medium"
                                    onClick={() =>
                                        setOpenInstances((current) => ({
                                            ...current,
                                            [instance.instanceId]: !isOpen,
                                        }))
                                    }
                                >
                                    {displayName}
                                </button>
                                {canRemove ? (
                                    <button
                                        type="button"
                                        className="rounded-md bg-red-500 px-2 py-1 text-white"
                                        onClick={() =>
                                            setPendingRemove({
                                                instanceId: instance.instanceId,
                                                displayName,
                                            })
                                        }
                                    >
                                        Remove
                                    </button>
                                ) : null}
                            </div>
                            {isOpen ? (
                                <GroupDisplay
                                    group={instance.group}
                                    showLabel={false}
                                    showMessages={false}
                                />
                            ) : null}
                        </div>
                    );
                })
            )}
            {pendingRemove ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="text-lg font-semibold">Are you sure?</h2>
                        <p className="mt-2 text-gray-600">
                            {pendingRemove.displayName} will be removed along
                            with its values.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                className="rounded-md bg-gray-200 px-4 py-2"
                                onClick={() => setPendingRemove(null)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="rounded-md bg-red-500 px-4 py-2 text-white"
                                onClick={confirmRemove}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
