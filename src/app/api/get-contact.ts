import { getMethodUrl } from "app/utils";
import { UserData, UserFormData } from "app/components/AuthorizationForm/AuthorizationForm";

type ContactData = {
    "avatar": string,
    "name": string,
    "email": string,
    "category": string,
    "description": string,
    "chatId": string,
    "lastSeen": string | null,
    "isArchive": boolean,
    "isDisappearing": boolean,
    "isMute": boolean,
    "messageExpiration": number,
    "muteExpiration": null | number
};

const getContact = async ( chatId: string, user: UserData | UserFormData | null ) => {
    try {
        const headers = {"Content-Type": "application/json"};
        const url = getMethodUrl("getContactInfo", user);
        const body = {chatId};

        if (!url) return false;

        const data = await fetch(url, {
            headers, method:"POST",
            body: JSON.stringify(body)
        });

        if (!data.ok) return false;
        
        const contactData: ContactData = await data.json();
        return contactData;

    } catch (err: any) {
        throw new Error(err.message);
    }
};

export type { ContactData };
export default getContact;