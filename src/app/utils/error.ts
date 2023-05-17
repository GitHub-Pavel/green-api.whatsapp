import { Dispatch, SetStateAction } from "react";

type UnknownErrorType = (
    value: unknown, 
    setError: Dispatch<SetStateAction<string | false>>, 
    callback: Function
) => void;

export const unknownError: UnknownErrorType = (value, setError, callback) => {
    if (value) return callback();
    setError("Something went wrong...");
}