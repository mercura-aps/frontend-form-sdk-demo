import { Link, useParams } from "react-router";
import { useConfigs } from "../form-sdk";

export default function ConfigsNavigation() {
    const configId = useParams()?.configId;
    const previousConfigId = useConfigs((state) => {
        const currentConfigIndex = state.configs.findIndex(
            (config) => config.id === Number(configId)
        );
        return state.configs[currentConfigIndex - 1]?.id;
    });
    const nextConfigId = useConfigs((state) => {
        const currentConfigIndex = state.configs.findIndex(
            (config) => config.id === Number(configId)
        );
        return state.configs[currentConfigIndex + 1]?.id;
    });
    return (
        <div className="flex w-full gap-2">
            {previousConfigId && (
                <Link
                    className="my-8 flex rounded-md bg-blue-500 p-2 text-white"
                    to={`/config/${previousConfigId}`}
                >
                    Previous
                </Link>
            )}
            {nextConfigId ? (
                <Link
                    className="my-8 flex rounded-md bg-blue-500 p-2 text-white"
                    to={`/config/${nextConfigId}`}
                >
                    Next
                </Link>
            ) : (
                <Link
                    className="my-8 flex rounded-md bg-blue-500 p-2 text-white"
                    to={"/checkout"}
                >
                    Checkout
                </Link>
            )}
        </div>
    );
}
