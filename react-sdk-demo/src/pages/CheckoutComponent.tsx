import { useState } from "react";
import ContactDetails from "../components/ContactDetails";
import GroupSummary from "../components/GroupSummary";
import Submit from "../components/SubmitComponent";
import SummaryElementRow from "../components/SummaryElementRow";
import { useFinishedConfigs, useNumberFormatter } from "../form-sdk";

export default function Checkout() {
    const finishedConfigs = useFinishedConfigs((state) =>
        state.getFinishedConfigs()
    );
    const [currentFinishedConfigIndex, setCurrentFinishedConfigIndex] =
        useState<number>(0);

    const currentFinishedConfig = finishedConfigs[currentFinishedConfigIndex];

    const configPrice = useNumberFormatter((state) =>
        state.getResolvedConfigPrice({
            configId: currentFinishedConfig?.config.id ?? -1,
            multiplyConfigQuantity: true,
            includedText: "included",
        })
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <ContactDetails />
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
                Configuration Summary
            </h2>
            <div className="mb-8 flex justify-center gap-3">
                {finishedConfigs.map((finishedConfig, index) => (
                    <button
                        key={finishedConfig.config.id}
                        className={`rounded-lg px-6 py-3 text-white shadow-md transition-all duration-200 ease-in-out ${
                            currentFinishedConfigIndex === index
                                ? "scale-105 bg-red-600 font-semibold hover:bg-red-700"
                                : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        onClick={() => setCurrentFinishedConfigIndex(index)}
                    >
                        {finishedConfig.config.name}
                    </button>
                ))}
            </div>
            {currentFinishedConfig ? (
                <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                    <h3 className="mb-6 text-center text-2xl font-semibold text-blue-700">
                        {currentFinishedConfig.config.name} -{" "}
                        {currentFinishedConfig.config.formName} - Details
                    </h3>
                    <div className="grid grid-cols-2 items-baseline gap-x-6 gap-y-4">
                        <div className="col-span-1 border-b-2 border-blue-200 pb-3 text-lg font-bold text-gray-700">
                            Component
                        </div>
                        <div className="col-span-1 border-b-2 border-blue-200 pb-3 text-lg font-bold text-gray-700">
                            Selected Value
                        </div>

                        {currentFinishedConfig.stepsWithSelections.map((step) =>
                            "elements" in step ? (
                                <GroupSummary
                                    key={step.id}
                                    group={step}
                                    values={currentFinishedConfig.values}
                                    quantities={
                                        currentFinishedConfig.quantities
                                    }
                                />
                            ) : (
                                <>
                                    <div className="col-span-2 mt-4 mb-2 border-t border-gray-200 pt-2 text-xl font-semibold text-blue-600">
                                        {step.label}
                                    </div>
                                    <SummaryElementRow
                                        key={step.id}
                                        element={step}
                                        values={currentFinishedConfig.values}
                                        quantities={
                                            currentFinishedConfig.quantities
                                        }
                                    />
                                </>
                            )
                        )}
                        <div className="col-span-2 py-1 font-medium text-gray-600">
                            {configPrice}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="mt-8 text-center text-lg text-gray-600">
                    Select a configuration to view its detailed summary.
                </p>
            )}
            <Submit />
        </div>
    );
}
