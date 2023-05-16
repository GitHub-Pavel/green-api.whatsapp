import * as yup from "yup";
import type { FC } from "react";
import { useState } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { commonActions } from "app/store";
import Loader from 'app/icons/loader.svg';
import { styled } from "styled-components";
import { useAppDispatch } from "app/hooks";
import { yupResolver } from '@hookform/resolvers/yup';
import { SettingsData } from "app/api/get-settings";
import { getContact, getSettings, getStateInstance, setSettings } from "app/api";
import { ContactData } from "app/api/get-contact";

const Button = styled.button`
    min-width: 130px;
`;

const schema = yup.object({
    IdInstance: 
        yup.string()
            .required("IdInstance is required")
            .matches(/^[0-9]+$/, "Must be only digits"),
    apiTokenInstance:
        yup.string()
            .required("ApiTokenInstance is required")
}).required();

type UserFormData = yup.InferType<typeof schema>;
type UserData = SettingsData & UserFormData & ContactData;

const AuthorizationForm: FC = () => {
    const [loading, setLoading] = useState(false);
    const [apiError, setError] = useState<false | string>(false);

    const dispatch = useAppDispatch();
    const { handleSubmit, register, formState: { errors } } = useForm<UserFormData>({
        resolver: yupResolver(schema)
    });
    const wrong = (is: unknown, callback: Function) => {
        if (is) return callback();
        setError("Something went wrong...");
    }
    
    const onSubmit = handleSubmit(async (user) => {
        try {
            setLoading(true);

            const stateInstance = await getStateInstance(user);

            if (stateInstance === "authorized") {
                const settingsData = await setSettings(user);

                wrong(settingsData, async () => {
                    const userSettings = await getSettings(user);

                    wrong(Boolean( userSettings ), async () => {
                        const settings = userSettings as SettingsData;
                        const userContact = await getContact(settings.wid, user);

                        wrong(Boolean( userContact ), async () => {
                            const contact = userContact as ContactData;

                            if (apiError) setError(false);
                            dispatch(commonActions.setUser({...settings , ...user, ...contact}));
                        });
                    });
                });
            } else {
                if (!stateInstance) {
                    setError("Something went wrong...");
                } else {
                    setError(`Account: <span class="font-semibold">${stateInstance}</span>`);
                }
            }

            setLoading(false);
        } catch(err: any) {
            console.warn(err);
            setLoading(false);
            setError('Wrong <span class="font-semibold">idInstance</span> or <span class="font-semibold">ApiTokenInstance</span>');
        }
    });

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-8">
                <label htmlFor="price" className="block text-md font-medium leading-6 mb-2">
                    IdInstance
                </label>
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="8746273910"
                    className={classNames(
                        "block w-full rounded-md border-0 py-2 px-3 ring-1 ring-inset sm:text-sm sm:leading-6",
                        {
                            "ring-input": !errors.IdInstance,
                            "ring-red-500": errors.IdInstance
                        }
                    )}
                    {...register("IdInstance")}
                />
                {errors.IdInstance && (
                    <p className="text-xs italic text-red-500 mt-2">{errors.IdInstance.message}</p>
                )}
            </div>
            <div className="mb-12">
                <label htmlFor="price" className="block text-md font-medium leading-6 mb-2">
                    ApiTokenInstance
                </label>
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="95fb56edfc5445398a401de3710a7acbb6ede8d3f18f4341d0"
                    className={classNames(
                        "block w-full rounded-md border-0 py-2 px-3 ring-1 ring-inset sm:text-sm sm:leading-6",
                        {
                            "ring-input": !errors.apiTokenInstance,
                            "ring-red-500": errors.apiTokenInstance
                        }
                    )}
                    {...register("apiTokenInstance")}
                />
                {errors.apiTokenInstance && (
                    <p className="text-xs italic text-red-500 mt-2">{errors.apiTokenInstance.message}</p>
                )}
            </div>
            <Button 
                className={classNames(
                    "rounded-md px-1.5 py-2.5 text-md font-semibold text-white shadow-sm text-center",
                    {
                        "bg-green hover:bg-green-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-hover": !Object.values(errors).length && !loading,
                        "bg-gray": Object.values(errors).length || loading
                    }
                )}
                disabled={Boolean( Object.values(errors).length ) || loading}
            >
                {loading ? <Loader /> : "Sign in"}
            </Button>
            {apiError && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 mt-6 text-sm">
                    <p dangerouslySetInnerHTML={{__html: apiError}}/>
                </div>
            )}
        </form>
    );
}

export type { UserData, UserFormData };
export default AuthorizationForm;