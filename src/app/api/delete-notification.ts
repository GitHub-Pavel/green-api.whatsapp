import { UserData } from "app/components/AuthorizationForm/AuthorizationForm";
import { getMethodUrl } from "app/utils";
import axios from "axios";

type DeleteNotificationData = {
    result: boolean
};

const deleteNotification = async ( user: UserData | null, receiptId: string ) => {
    try {
        const headers = {"Content-Type": "application/json"};
        const url = getMethodUrl("DeleteNotification", user, receiptId);

        if (!url ) return false;

        const deleteNotificationData = await axios.delete<DeleteNotificationData>(url, {headers});
        return deleteNotificationData.data;

    } catch (err: any) {
        throw new Error(err.message);
    }
};

export default deleteNotification;