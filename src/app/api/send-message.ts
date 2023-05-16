import { UserData } from "app/components/AuthorizationForm/AuthorizationForm";
import { getMethodUrl } from "app/utils";

type MessageData = {
    idMessage: string;
}

const sendMessage = async ( user: UserData | null, chatId: string | null, message: string ) => {
    try {
        const headers = {"Content-Type": "application/json"};
        const url = getMethodUrl("sendMessage", user);
        const body = {message, chatId};

        if (!url || !chatId) return false;

        const data = await fetch(url, {
            headers, method:"POST",
            body: JSON.stringify(body)
        });
        const messageData: MessageData = await data.json();
        return messageData;

    } catch (err: any) {
        throw new Error(err.message);
    }
};

export default sendMessage;