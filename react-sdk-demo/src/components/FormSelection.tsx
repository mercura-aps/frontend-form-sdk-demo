import { useState } from "react";
import FormSelectionBreadcrumb from "./FormSelectionBreadcrumb";
import FormSelectionFilter from "./FormSelectionFilter";

export default function FormSelection() {
    const [strategy, setStrategy] = useState<"breadcrumb" | "filter">(
        "breadcrumb"
    );

    return (
        <div>
            <div className="flex gap-2">
                <label className="flex items-center gap-2">
                    Breadcrumb
                    <input
                        type="radio"
                        name="strategy"
                        value="breadcrumb"
                        checked={strategy === "breadcrumb"}
                        onChange={() => setStrategy("breadcrumb")}
                    />
                </label>
                <label className="flex items-center gap-2">
                    Filter
                    <input
                        type="radio"
                        name="strategy"
                        value="filter"
                        checked={strategy === "filter"}
                        onChange={() => setStrategy("filter")}
                    />
                </label>
            </div>
            {strategy === "breadcrumb" ? (
                <FormSelectionBreadcrumb />
            ) : (
                <FormSelectionFilter />
            )}
        </div>
    );
}
