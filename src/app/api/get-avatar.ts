import { getMethodUrl } from "app/utils";
import { UserData, UserFormData } from "app/components/AuthorizationForm/AuthorizationForm";

type AvatarData = {
    existsWhatsapp:	boolean,	
    urlAvatar: string,	
    reason?: string
};

const getAvatar = async ( chatId: string, user: UserData | UserFormData | null ) => {
    try {
        const headers = {"Content-Type": "application/json"};
        const url = getMethodUrl("GetAvatar", user);
        const body = {chatId};

        if (!url) return false;

        const data = await fetch(url, {
            headers, method:"POST",
            body: JSON.stringify(body)
        });

        if (!data.ok) return false;
        
        const avatar: AvatarData = await data.json();
        return avatar;

    } catch (err: any) {
        throw new Error(err.message);
    }
};

export type { AvatarData };
export default getAvatar;