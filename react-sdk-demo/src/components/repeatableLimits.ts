import type { TRepeatableGroup } from "@mercura-aps/frontend-form-sdk";

export function repeatableLimits(group: TRepeatableGroup): TRepeatableGroup {
    return {
        ...group,
        min_instances: group.schema.min_instances ?? group.min_instances,
        max_instances: group.schema.max_instances ?? group.max_instances,
    };
}

export function canAddRepeatableInstance(group: TRepeatableGroup): boolean {
    if (group.max_instances === null) {
        return true;
    }
    return group.instances.length < group.max_instances;
}

export function canRemoveRepeatableInstance(group: TRepeatableGroup): boolean {
    return group.instances.length > Math.max(0, group.min_instances);
}
