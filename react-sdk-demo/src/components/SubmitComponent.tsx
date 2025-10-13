import { useSubmit } from "../form-sdk";

export default function Submit() {
    const submit = useSubmit((state) => state.submit);
    const isSubmitEnabled = useSubmit((state) => state.isSubmitEnabled);
    const isLoadingSubmit = useSubmit((state) => state.isLoadingSubmit);
    if (!isSubmitEnabled) {
        return <button disabled>Submit not enabled</button>;
    }
    if (isLoadingSubmit) {
        return <button disabled>Loading...</button>;
    }
    return (
        <button
            onClick={async () => {
                const result = await submit();
                if (result.ok) {
                    alert("Submitted");
                }
            }}
        >
            Submit
        </button>
    );
}
