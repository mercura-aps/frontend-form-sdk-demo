import { useConfigs, useForms } from "../form-sdk";

export default function FormCards() {
    const forms = useForms((state) => state.paginatedFormsData.data);
    const isLoading = useForms((state) => state.paginatedFormsData.isLoading);
    const addConfig = useConfigs((state) => state.addConfig);
    const configsCounter = useConfigs((state) => state.configsCounter);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return forms?.data.map((form) => (
        <button
            className="rounded-md bg-blue-500 p-2 text-white"
            key={form.id}
            onClick={() =>
                addConfig({
                    configQuantity: 1,
                    formId: form.id,
                    name: `Config ${configsCounter + 1}`,
                    formName: form.name,
                })
            }
        >
            {form.name}
        </button>
    ));
}
