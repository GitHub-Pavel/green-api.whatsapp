import { UserData } from "app/components/AuthorizationForm/AuthorizationForm";
import { getMethodUrl } from "app/utils";
import axios from "axios";
import { InstanceTypes } from "./get-state-instance";
import { MessageData } from "app/store/slices/commonSlice";


export type StateInstanceChanged = {
    typeWebhook: "stateInstanceChanged",
    instanceData: {
        idInstance: string,
        wid: string
    },
    timestamp: number,
    stateInstance: InstanceTypes
};

type ReceiveNotificationData = {
    receiptId: string,
    body: MessageData | StateInstanceChanged
};

const receiveNotification = async ( user: UserData | null ) => {
    try {
        const headers = {"Content-Type": "application/json"};
        const url = getMethodUrl("ReceiveNotification", user);

        if (!url ) return false;

        const receiveNotificationData = await axios.get<ReceiveNotificationData>(url, {headers});
        return receiveNotificationData.data;

    } catch (err: any) {
        throw new Error(err.message);
    }
};

export default receiveNotification;