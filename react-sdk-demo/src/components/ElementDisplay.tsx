import type { TElement } from "@mercura-aps/frontend-form-sdk";
import {
    useFormByCurrentConfigId,
    useNumberFormatter,
    useValuesByCurrentConfigId,
} from "../form-sdk";
import MessageDisplay from "./MessageDisplay";

export default function ElementDisplay({ element }: { element: TElement }) {
    const elementValue = useValuesByCurrentConfigId(
        (state) => state.values[element.id]
    );
    const handleChangeInput = useValuesByCurrentConfigId(
        (state) => state.handleChangeInput
    );
    const resolveOptionPrice = useNumberFormatter((state) =>
        state.getResolveOptionPrice()
    );

    const message = useFormByCurrentConfigId(
        (state) => state.messages.elements[element.id]
    );
    const renderOptions = (() => {
        if (!("options" in element)) {
            return null;
        }

        if (element.type === "select") {
            return (
                <select
                    value={elementValue?.[0] ?? ""}
                    onChange={(e) => {
                        handleChangeInput?.({
                            type: element.type,
                            elementId: element.id,
                            optionIdOrValue: e.target.value,
                        });
                    }}
                >
                    {element.options.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name} -{" "}
                            {resolveOptionPrice?.({
                                option,
                                element,
                                includedText: "included",
                            })}
                        </option>
                    ))}
                </select>
            );
        }

        return element.options.map((option) => (
            <label
                key={option.id}
                className="flex items-center gap-2 rounded-md border p-2"
            >
                <img src={option.image ?? ""} className="h-10 w-10" />
                {option.name} -{" "}
                {resolveOptionPrice?.({
                    option,
                    element,
                    includedText: "included",
                })}
                <input
                    type={element.type}
                    value={option.id}
                    checked={elementValue?.includes(option.id.toString())}
                    onChange={() =>
                        handleChangeInput?.({
                            type: element.type,
                            elementId: element.id,
                            optionIdOrValue: option.id,
                        })
                    }
                />
            </label>
        ));
    })();

    const renderInput = (() => {
        if ("options" in element) {
            return null;
        }

        return (
            <input
                type={element.type}
                className="rounded-md border p-2"
                value={elementValue?.[0] ?? (element.type === "text" ? "" : 0)}
                onChange={(e) => {
                    handleChangeInput?.({
                        type: element.type,
                        elementId: element.id,
                        optionIdOrValue: e.target.value,
                    });
                }}
            />
        );
    })();

    return (
        <div className="relative flex flex-1 flex-col gap-2 rounded-md border p-2">
            {message && (
                <div className="sticky top-0">
                    <MessageDisplay message={message} />
                </div>
            )}
            <div>
                {element.label}{" "}
                {element.state === "required" && (
                    <span className="text-red-500">*</span>
                )}
            </div>
            {renderInput ?? renderOptions}
        </div>
    );
}
