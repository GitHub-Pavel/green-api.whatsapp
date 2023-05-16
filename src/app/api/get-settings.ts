import axios from "axios";
import { getMethodUrl } from "app/utils";
import { UserFormData } from "app/components/AuthorizationForm/AuthorizationForm";

type SettingsData = {
    wid: string, 
    countryInstance: string,
    typeAccount: string,
    webhookUrl: string,
    webhookUrlToken: string,
    delaySendMessagesMilliseconds: number,
    markIncomingMessagesReaded: string,
    markIncomingMessagesReadedOnReply: string,
    outgoingWebhook: string,
    outgoingMessageWebhook: string,
    stateWebhook: string,
    incomingWebhook: string,
    deviceWebhook: string,
    statusInstanceWebhook: string,
    sendFromUTC: string,
    sendToUTC: string
};

const getSettings = async ( user: UserFormData ) => {
    try {
        const url = getMethodUrl("GetSettings", user);
        const headers = {"Content-Type": "application/json"};

        if (!url) return false;

        const data = await axios.get<SettingsData>(url, {headers});
        return data.data;

    } catch (err: any) {
        throw new Error(err.message);
    }
};

export type { SettingsData };
export default getSettings;