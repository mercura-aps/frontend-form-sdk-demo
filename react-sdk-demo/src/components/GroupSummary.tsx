import type {
    TGroup,
    TQuantities,
    TValues,
} from "@mercura-aps/frontend-form-sdk";
import { useNumberFormatter } from "../form-sdk";
import SummaryElementRow from "./SummaryElementRow";

export default function GroupSummary({
    group,
    values,
    quantities,
}: {
    group: TGroup;
    values: TValues;
    quantities: TQuantities;
}) {
    const resolveStepPrice = useNumberFormatter((state) =>
        state.getResolveStepPrice()
    );

    return (
        <>
            <div className="col-span-2 mt-4 mb-2 border-t border-gray-200 pt-2 text-xl font-semibold text-blue-600">
                {group.label}
            </div>
            {group.elements.map((element) => (
                <SummaryElementRow
                    key={element.id}
                    element={element}
                    values={values}
                    quantities={quantities}
                />
            ))}
            <div className="col-span-2 py-1 font-medium text-gray-600">
                {resolveStepPrice?.({
                    step: group,
                    values,
                    quantities,
                    includedText: "included",
                })}
            </div>
        </>
    );
}
