import { useParams } from "react-router";
import { useConfigs, useFormByCurrentConfigId } from "../form-sdk";

export default function StepsNavigation() {
    const configId = useParams()?.configId;
    const configStatus = useConfigs(
        (state) =>
            state.configs.find((config) => config.id === Number(configId))
                ?.status
    );
    const steps = useFormByCurrentConfigId((state) => state.steps);
    const setCurrentProgress = useFormByCurrentConfigId(
        (state) => state.setCurrentProgress
    );
    const currentProgress = useFormByCurrentConfigId(
        (state) => state.currentProgress
    );
    const stepsAvailability = useFormByCurrentConfigId(
        (state) => state.stepsAvailability
    );

    return (
        <div className="grid grid-cols-1">
            <div>{configStatus}</div>
            {steps?.map(
                (step, i) =>
                    step && (
                        <button
                            key={step.id}
                            className={`rounded-md p-2 text-left disabled:bg-gray-500 ${
                                currentProgress === i
                                    ? "bg-blue-500 text-white"
                                    : ""
                            }`}
                            disabled={!stepsAvailability?.[i]}
                            onClick={() => setCurrentProgress?.(i)}
                        >
                            {step.label}
                        </button>
                    )
            )}
        </div>
    );
}
