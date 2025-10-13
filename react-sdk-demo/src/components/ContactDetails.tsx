import { useContactDetails } from "../form-sdk";

export default function ContactDetails() {
    const requestFields = useContactDetails(
        (state) => state.requestFieldsData.data
    );
    const setSubFieldValue = useContactDetails(
        (state) => state.setSubFieldValue
    );
    const requestFieldsValues = useContactDetails(
        (state) => state.requestFieldsValues
    );
    const requestFieldsErrors = useContactDetails(
        (state) => state.requestFieldsErrors
    );
    const fixedContactDetails = useContactDetails(
        (state) => state.fixedContactDetails
    );
    const setFixedContactDetailsValue = useContactDetails(
        (state) => state.setFixedContactDetailsValue
    );

    return (
        <div className="space-y-6 p-4">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
                <h3 className="mb-4 border-b border-gray-100 pb-2 text-lg font-semibold text-gray-900">
                    Fixed Contact Details
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {fixedContactDetails.map((fixedContactDetail) => (
                        <label
                            key={fixedContactDetail.id}
                            className="space-y-2"
                        >
                            <div className="block text-sm font-medium text-gray-700">
                                {fixedContactDetail.id}{" "}
                                <span className="text-red-500">*</span>
                            </div>
                            <input
                                type="text"
                                value={fixedContactDetail.value ?? ""}
                                onChange={(e) =>
                                    setFixedContactDetailsValue({
                                        id: fixedContactDetail.id,
                                        value: e.target.value,
                                    })
                                }
                                className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder={`Enter ${fixedContactDetail.id.toLowerCase()}`}
                            />
                            {fixedContactDetail.error && (
                                <div className="text-red-500">
                                    {fixedContactDetail.error ===
                                        "invalid-email" && "Invalid email"}
                                    {fixedContactDetail.error === "missing" &&
                                        "Required"}
                                </div>
                            )}
                        </label>
                    ))}
                </div>
            </div>
            {requestFields?.map((field) => (
                <div
                    key={field.id}
                    className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
                >
                    <h3 className="mb-4 border-b border-gray-100 pb-2 text-lg font-semibold text-gray-900">
                        {field.name}
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {field.fields.map((subField) => (
                            <label
                                key={field.id + "-" + subField.id}
                                className="space-y-2"
                            >
                                <div className="block text-sm font-medium text-gray-700">
                                    {subField.name}{" "}
                                    {subField.required && (
                                        <span className="text-red-500">*</span>
                                    )}
                                </div>
                                <input
                                    type={subField.type}
                                    checked={
                                        subField.type === "checkbox"
                                            ? requestFieldsValues[field.id]?.[
                                                  subField.id
                                              ] === "true"
                                            : false
                                    }
                                    value={
                                        requestFieldsValues[field.id]?.[
                                            subField.id
                                        ] ?? ""
                                    }
                                    onChange={(e) =>
                                        setSubFieldValue({
                                            requestFieldId: field.id,
                                            requestSubFieldId: subField.id,
                                            value:
                                                subField.type === "checkbox"
                                                    ? String(e.target.checked)
                                                    : e.target.value,
                                        })
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm transition-colors duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder={`Enter ${subField.name.toLowerCase()}`}
                                />
                                {requestFieldsErrors[field.id]?.[
                                    subField.id
                                ] && (
                                    <div className="text-red-500">
                                        {requestFieldsErrors[field.id]?.[
                                            subField.id
                                        ] === "invalid-number" &&
                                            "Invalid number"}
                                        {requestFieldsErrors[field.id]?.[
                                            subField.id
                                        ] === "unchecked-checkbox" &&
                                            "Unchecked checkbox"}
                                        {requestFieldsErrors[field.id]?.[
                                            subField.id
                                        ] === "missing" && "Required"}
                                    </div>
                                )}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
