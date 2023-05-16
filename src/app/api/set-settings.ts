import axios from "axios";
import { getMethodUrl } from "app/utils";
import { UserData, UserFormData } from "app/components/AuthorizationForm/AuthorizationForm";


const setSettings = async ( user: UserData | UserFormData | null ) => {
    try {
        const url = getMethodUrl("setSettings", user);
        const headers = {"Content-Type": "application/json"};
        const body = {
            "webhookUrl": "",
            "outgoingWebhook": "no",
            "stateWebhook": "yes",
            "incomingWebhook": "yes"
        };

        if (!url) return false;

        const data = await axios.post(url, {headers, body});

        if (data.request.status === 200) return true;
        return false;

    } catch(err: any) {
        throw new Error(err.message);
    }
}

export default setSettings;