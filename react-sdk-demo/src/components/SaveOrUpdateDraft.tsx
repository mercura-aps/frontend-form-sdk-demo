import { useSubmit } from "../form-sdk";

export default function SaveOrUpdateDraft() {
    const saveOrUpdateDraft = useSubmit((state) => state.saveOrUpdateDraft);
    const isDraftSave = useSubmit((state) => state.isDraftSave);
    const isLoadingDraft = useSubmit((state) => state.isLoadingDraft);
    const isDraftEnabled = useSubmit((state) => state.isDraftEnabled);
    const savedDraftName = useSubmit((state) => state.savedDraftName);
    const draftId = useSubmit((state) => state.draftId);

    if (!isDraftEnabled) {
        return <button disabled>Draft not enabled</button>;
    }

    if (isLoadingDraft) {
        return <button disabled>Loading...</button>;
    }

    return (
        <button onClick={saveOrUpdateDraft}>
            {isDraftSave ? "Save" : `Update ${savedDraftName} #${draftId}`}
        </button>
    );
}
