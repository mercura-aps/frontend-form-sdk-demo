import { useConfigs, useNumberFormatter } from "../form-sdk";

export default function CurrentConfigPriceDisplay() {
    const currentConfigId = useConfigs((state) => state.currentConfigId);
    const configPrice = useNumberFormatter((state) =>
        state.getResolvedConfigPrice({
            configId: currentConfigId ?? -1,
            multiplyConfigQuantity: false,
            includedText: "included",
        })
    );

    if (!currentConfigId || currentConfigId === -1) {
        return null;
    }
    return (
        <div className="flex flex-col gap-2 rounded-md border p-2">
            {configPrice}
        </div>
    );
}
