import { useEffect } from "react";
import { useParams } from "react-router";
import ConfigsNavigation from "../components/ConfigsNavigation";
import ElementDisplay from "../components/ElementDisplay";
import GroupDisplay from "../components/GroupDisplay";
import StepsNavigation from "../components/StepsNavigation";
import { useConfigs, useFormByCurrentConfigId } from "../form-sdk";

export default function Config() {
    const setCurrentConfigId = useConfigs((state) => state.setCurrentConfigId);
    const configId = useParams().configId;
    useEffect(() => {
        if (!configId) {
            setCurrentConfigId(-1);
            return undefined;
        }
        setCurrentConfigId(Number(configId));
        return () => {
            setCurrentConfigId(-1);
        };
    }, [configId, setCurrentConfigId]);
    const setNextCurrentStep = useFormByCurrentConfigId(
        (state) => state.setNextCurrentStep
    );
    const currentStep = useFormByCurrentConfigId((state) => state.currentStep);
    const isLoading = useFormByCurrentConfigId((state) => state.isLoading);
    const isCurrentStepFinished = useFormByCurrentConfigId(
        (state) => state.isCurrentStepFinished
    );

    return (
        <div>
            <div className="flex gap-2">
                <div>
                    <StepsNavigation />
                </div>
                {currentStep && !isLoading ? (
                    <div>
                        <button
                            className={
                                "rounded-md bg-blue-500 p-2 disabled:bg-gray-500"
                            }
                            disabled={!isCurrentStepFinished}
                            onClick={setNextCurrentStep}
                        >
                            Next step
                        </button>
                        {"elements" in currentStep ? (
                            <GroupDisplay
                                key={currentStep.id}
                                group={currentStep}
                            />
                        ) : (
                            <ElementDisplay
                                key={currentStep?.id}
                                element={currentStep}
                            />
                        )}
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <ConfigsNavigation />
        </div>
    );
}
