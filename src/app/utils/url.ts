import { apiUrl } from "app/configs/api";
import type { UserData, UserFormData } from "app/components/AuthorizationForm/AuthorizationForm";


export const getMethodUrl = ( method: string, user: UserFormData | UserData | null, param?: string ) => {
    if (!user) return false;
    
    const data = param ? '/'+param : '';

    return apiUrl+'/waInstance'+user.IdInstance+'/'+method+'/'+user.apiTokenInstance+data;
};