import {
    isElement,
    isGroup,
    isRepeatableGroup,
} from "@mercura-aps/frontend-form-sdk";
import { Fragment, useEffect } from "react";
import { useParams } from "react-router";
import ConfigsNavigation from "../components/ConfigsNavigation";
import ElementDisplay from "../components/ElementDisplay";
import GroupDisplay from "../components/GroupDisplay";
import RepeatableGroup from "../components/RepeatableGroup";
import StepsNavigation from "../components/StepsNavigation";
import { useConfigs, useFormByCurrentConfigId } from "../form-sdk";

const STEP_COMPONENTS = {
    repeatableGroup: RepeatableGroup,
    group: GroupDisplay,
    element: ElementDisplay,
};

function renderCurrentStep(step: Parameters<typeof isElement>[0]) {
    if (isRepeatableGroup(step)) {
        const Component = STEP_COMPONENTS.repeatableGroup;
        return (
            <Fragment key={step.id}>
                <Component group={step} />
            </Fragment>
        );
    }
    if (isGroup(step)) {
        const Component = STEP_COMPONENTS.group;
        return (
            <Fragment key={step.id}>
                <Component group={step} />
            </Fragment>
        );
    }
    if (isElement(step)) {
        const Component = STEP_COMPONENTS.element;
        return (
            <Fragment key={step.id}>
                <Component element={step} />
            </Fragment>
        );
    }

    return null;
}

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
                <Fragment>
                    <StepsNavigation />
                </Fragment>
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
                        {renderCurrentStep(currentStep)}
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <ConfigsNavigation />
        </div>
    );
}
