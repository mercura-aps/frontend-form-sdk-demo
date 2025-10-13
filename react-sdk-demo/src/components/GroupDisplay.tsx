import type { TGroup } from "@mercura-aps/frontend-form-sdk";
import { useFormByCurrentConfigId } from "../form-sdk";
import ElementDisplay from "./ElementDisplay";
import MessageDisplay from "./MessageDisplay";

export default function GroupDisplay({ group }: { group: TGroup }) {
    const message = useFormByCurrentConfigId(
        (state) => state.messages.groups[group.id]
    );
    return (
        <div className="relative flex-1 rounded-md border p-2">
            {message && (
                <div className="sticky top-0">
                    <MessageDisplay message={message} />
                </div>
            )}
            <div>{group.label}</div>
            <div className="grid grid-cols-1 gap-2">
                {group.elements.map((element) => (
                    <ElementDisplay key={element.id} element={element} />
                ))}
            </div>
        </div>
    );
}
