import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { useConfigs, useSubmit } from "../form-sdk";

export default function Draft() {
    const draftId = useParams()?.draftId;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const openFromDraft = useSubmit((state) => state.openFromDraft);
    useEffect(() => {
        if (draftId) {
            setIsLoading(true);
            openFromDraft(Number(draftId)).then(() => setIsLoading(false));
        }
    }, [draftId, openFromDraft]);
    const firstConfigId = useConfigs((state) => state.configs[0]?.id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!firstConfigId) {
        return <div>No config found</div>;
    }

    return <Navigate to={"/"} />;
}
