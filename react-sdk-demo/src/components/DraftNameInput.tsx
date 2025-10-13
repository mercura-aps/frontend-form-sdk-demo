import { useSubmit } from "../form-sdk";

export default function DraftNameInput() {
    const draftName = useSubmit((state) => state.draftName);
    const setDraftName = useSubmit((state) => state.setDraftName);
    return (
        <input
            type="text"
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
        />
    );
}
