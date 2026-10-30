import type { TGroup } from "@mercura-aps/frontend-form-sdk";
import { useFormByCurrentConfigId } from "../form-sdk";
import ElementDisplay from "./ElementDisplay";
import MessageDisplay from "./MessageDisplay";

export default function GroupDisplay({
    group,
    showLabel = true,
    showMessages = true,
}: {
    group: TGroup;
    showLabel?: boolean;
    showMessages?: boolean;
}) {
    const messages = useFormByCurrentConfigId(
        (state) => state.messages.groups[group.id]
    );
    return (
        <div className="relative flex-1 rounded-md border p-2">
            {showMessages && messages?.length ? (
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
            {showLabel ? <div>{group.label}</div> : null}
            <div className="grid grid-cols-1 gap-2">
                {group.elements.map((element) => (
                    <ElementDisplay key={element.id} element={element} />
                ))}
            </div>
        </div>
    );
}
