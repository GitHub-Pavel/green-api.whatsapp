import axios from "axios";
import { getMethodUrl } from "app/utils";
import { UserData, UserFormData } from "app/components/AuthorizationForm/AuthorizationForm";

export type InstanceTypes = "notAuthorized" | "authorized" | "blocked";

const getStateInstance = async ( user: UserFormData | UserData | null ) => {
    try {
        const url = getMethodUrl("getStateInstance", user);
        const headers = {"Content-Type": "application/json"};

        if (!url) return false;

        const data = await axios.get(url, {headers});
        return data.data.stateInstance as InstanceTypes;

    } catch (err: any) {
        throw new Error(err.message);
    }
};

export default getStateInstance;