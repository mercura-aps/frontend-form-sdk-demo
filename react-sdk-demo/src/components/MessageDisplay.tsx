import type { Message } from "@mercura-aps/frontend-form-sdk";

export default function MessageDisplay({ message }: { message: Message }) {
    return (
        <div className="rounded-md bg-white p-2 text-black">
            {message.message}
        </div>
    );
}
