import * as yup from "yup";
import type { FC } from "react";
import { useState } from "react";
import classNames from "classnames";
import Plus from "app/icons/plus.svg";
import Loader from "app/icons/loader.svg";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkWhatsapp, getContact } from "app/api";
import { commonActions } from "app/store";
import { ChatData } from "app/store/slices/commonSlice";
import { unknownError } from "app/utils";

const FormBox = styled.div`
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    background-color: var(--search-input-background);
    color: var(--input-placeholder);
    outline: none;
`;

const Button = styled.button`
    height: 36px;
    width: 36px;
`;

const IconWrap = styled.div`
    svg {
        stroke: #fff;
        stroke-width: 2px;
    }
`;

const schema = yup.object({
    phoneNumber: 
        yup.string()
            .required("This is required field")
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(11, "Must be 11-12 digits")
            .max(12, "Must be 11-12 digits")
}).required();

type AddFormData = yup.InferType<typeof schema>;

const ContactForm: FC = () => {
    const [loading, setLoading] = useState(false);
    const [apiError, setError] = useState<false | string>(false);

    const dispatch = useAppDispatch();
    const user = useAppSelector((store) => store.common.user);
    const chats = useAppSelector((store) => store.common.chats);
    const { handleSubmit, register, formState: { errors }, reset } = useForm<AddFormData>({
        resolver: yupResolver(schema)
    });
    const inputHandler = () => apiError && setError(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setLoading(true);

            const checkedData = await checkWhatsapp(data.phoneNumber, user);

            unknownError(checkedData, setError, async () => {
                const chatId: string = `${data.phoneNumber}@c.us`;
                const contact = await getContact(chatId, user);

                if (checkedData && !checkedData.existsWhatsapp)
                    return setError("This phone number does not have whatsapp");

                if (chatId === user?.wid || !contact)
                    return setError("Something went wrong...");

                if (chats[chatId])
                    return setError("This chat exists!");
                
                if (apiError) setError(false);
                const currentContact: ChatData = {...contact, messages: []};
                dispatch(commonActions.addChat({[chatId]: currentContact}));
                reset();
            });

            setLoading(false);
        } catch(err: any) {
            console.warn(err);
            setLoading(false);
            setError("Something went wrong...");
        }
    });

    return (
        <form className="px-3.5" onSubmit={onSubmit}>
            <FormBox className="py-2">
                <Input 
                    type="text" 
                    autoComplete="off"
                    onInput={inputHandler}
                    placeholder="Enter phone number"
                    className={classNames(
                        "flex-1 py-2 px-3.5 rounded-md text-sm",
                        {
                            "ring-red-500": errors.phoneNumber
                        }    
                    )}
                    {...register("phoneNumber")}
                />
                <Button 
                    className={classNames(
                        "rounded-md text-md font-semibold text-white shadow-sm text-center ml-2",
                        {
                            "bg-green hover:bg-green-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-hover": !Object.values(errors).length && !loading,
                            "bg-gray": Object.values(errors).length || loading
                        }
                    )}
                    disabled={Boolean( Object.values(errors).length ) || loading}
                >
                    {loading ? (
                        <Loader /> 
                    ) : (
                        <IconWrap>
                            <Plus width={24} height={24}/>
                        </IconWrap>
                    )}
                </Button>
            </FormBox>
            {errors.phoneNumber && (
                <p className="text-xs italic text-red-500 mb-2">{errors.phoneNumber.message}</p>
            )}
            {apiError && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 text-sm mb-2">
                    <p dangerouslySetInnerHTML={{__html: apiError}}/>
                </div>
            )}
        </form>
    );
}

export default ContactForm;