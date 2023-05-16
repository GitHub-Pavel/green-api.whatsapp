import { getMethodUrl } from "app/utils";
import { UserData, UserFormData } from "app/components/AuthorizationForm/AuthorizationForm";

type CheckData = {
    existsWhatsapp:	boolean
};

const checkWhatsapp = async ( phoneNumber: string, user: UserData | UserFormData | null ) => {
    try {
        const headers = {"Content-Type": "application/json"};
        const url = getMethodUrl("CheckWhatsapp", user);
        const body = {phoneNumber};

        if (!url) return false;

        const data = await fetch(url, {
            headers, method:"POST",
            body: JSON.stringify(body)
        });
        const checkData: CheckData = await data.json();
        return checkData;

    } catch (err: any) {
        throw new Error(err.message);
    }
};

export type { CheckData };
export default checkWhatsapp;