import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { useSubmit } from "../form-sdk";

export default function RequestCopy() {
    const requestCopyId = useParams()?.requestCopyId;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const openFromRequestCopy = useSubmit((state) => state.openFromRequestCopy);
    useEffect(() => {
        if (requestCopyId) {
            openFromRequestCopy(Number(requestCopyId)).then(() =>
                setIsLoading(false)
            );
        }
    }, [requestCopyId, openFromRequestCopy]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <Navigate to={"/"} />;
}
