import { Link } from "react-router";
import DraftNameInput from "../components/DraftNameInput";
import FormSelection from "../components/FormSelection";
import { useConfigs } from "../form-sdk";

export default function CreateConfigs() {
    const configs = useConfigs((state) => state.configs);
    const removeConfig = useConfigs((state) => state.removeConfig);
    const updateConfig = useConfigs((state) => state.updateConfig);

    return (
        <div className="grid grid-cols-2 gap-2">
            <div>
                <h1>Create Configs</h1>
                <DraftNameInput />
                <div className="m-2 flex flex-col gap-2 rounded-md border p-2">
                    {configs.map((config) => (
                        <div
                            className="flex items-center justify-between gap-2 rounded-md bg-blue-500 p-2 text-white"
                            key={config.id}
                        >
                            <div className="flex gap-2">
                                <div>{config.name}</div>
                                <div>
                                    <button
                                        onClick={() =>
                                            updateConfig(config.id, {
                                                configQuantity:
                                                    config.configQuantity - 1,
                                            })
                                        }
                                    >
                                        -
                                    </button>
                                    {config.configQuantity}
                                    <button
                                        onClick={() =>
                                            updateConfig(config.id, {
                                                configQuantity:
                                                    config.configQuantity + 1,
                                            })
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                                <div>{config.formName}</div>
                                <div>{config.status}</div>
                            </div>
                            <button
                                className="rounded-md bg-red-500 p-2 text-white"
                                onClick={() => removeConfig(config.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <FormSelection />
            <Link to={`/config/${configs[0]?.id ?? 0}`}>Continue</Link>
        </div>
    );
}
