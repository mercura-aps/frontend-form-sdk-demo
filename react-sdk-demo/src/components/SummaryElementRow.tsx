import {
    hasOptions,
    type TElement,
    type TQuantities,
    type TValues,
} from "@mercura-aps/frontend-form-sdk";
import { useMemo } from "react";
import { useNumberFormatter } from "../form-sdk";

export default function SummaryElementRow({
    element,
    values,
    quantities,
}: {
    element: TElement;
    values: TValues;
    quantities: TQuantities;
}) {
    const resolveOptionPriceWithQuantities = useNumberFormatter((state) =>
        state.getResolveOptionPriceWithQuantities()
    );
    const resolveElementPrice = useNumberFormatter((state) =>
        state.getResolveElementPrice()
    );

    const valueDisplay = useMemo(() => {
        const selectedValue = values[element.id];
        if (hasOptions(element) && Array.isArray(element.options)) {
            const selectedOption = element.options
                .map(
                    (option) =>
                        `${option.name} - ${
                            quantities[element.id]?.[option.id] ?? 1
                        } - ${resolveOptionPriceWithQuantities?.({
                            option,
                            element,
                            elementQuantities: quantities[element.id] ?? {},
                            includedText: "included",
                        })}`
                )
                .toString();
            return selectedOption ? selectedOption : "N/A (Option not found)";
        }
        return selectedValue !== undefined && selectedValue !== null
            ? String(selectedValue)
            : "N/A (No value)";
    }, [element, values, quantities, resolveOptionPriceWithQuantities]);

    return (
        <>
            <div className="col-span-1 py-1 pl-4 text-gray-800">
                {element.label}
            </div>
            <div className="col-span-1 py-1 font-medium text-gray-600">
                {valueDisplay}
            </div>
            <div className="col-span-2 py-1 font-medium text-gray-600">
                {resolveElementPrice?.({
                    element,
                    values,
                    quantities,
                    includedText: "included",
                })}
            </div>
        </>
    );
}
