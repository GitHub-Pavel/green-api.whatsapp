import { useState } from "react";
import classNames from "classnames";
import { sendMessage } from "app/api";
import Send from "app/icons/send.svg";
import { commonActions } from "app/store";
import Loader from "app/icons/loader.svg";
import { styled } from "styled-components";
import type { FC, ChangeEvent, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";

const FormBox = styled.div`
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    background-color: var(--app-background);
    color: var(--input-placeholder);
    outline: none;
`;

const Button = styled.button`
    height: 36px;
    width: 36px;

    &:not(.disabled):not(.loading):hover {
        background: rgba(var(--button-plain-background-hover-rgb), .8);
    }

    &.disabled {
        opacity: 0;
    }
`;

const IconWrap = styled.div`
    svg {
        fill: var(--icon);
    }
`;

const ChatForm: FC = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();
    const user = useAppSelector((store) => store.common.user);
    const currentChat = useAppSelector((store) => store.common.currentChat);
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const onSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault();

            if (message === "") return;
            setLoading(true);

            const messageData = await sendMessage(user, currentChat, message);

            if (messageData && user && currentChat) {
                setMessage("");
                dispatch(commonActions.addMessage({
                    typeWebhook: "outgoingMessageReceived",
                    idMessage: messageData.idMessage,
                    instanceData: {
                        idInstance: user.IdInstance,
                        wid: user.wid
                    },
                    timestamp: Date.now() / 1000,
                    messageData: {
                        typeMessage: "textMessage",
                        textMessageData: {
                            textMessage: message
                        }
                    },
                    senderData: {
                        chatId: currentChat,
                        sender: user.wid,
                        senderName: user.name
                    }
                }));
            } else {
                console.warn(messageData);
            }

            setLoading(false);
        } catch(err: any) {
            console.warn(err);
            setLoading(false);
        }
    };

    return (
        <form className="px-3.5" onSubmit={onSubmit}>
            <FormBox className="py-2">
                <Input 
                    type="text" 
                    value={message}
                    autoComplete="off"
                    onInput={inputHandler}
                    placeholder="Enter message"
                    className="flex-1 py-2 px-3.5 rounded-md text-sm"
                />
                <Button 
                    className={classNames(
                        "rounded-full text-md font-semibold text-white shadow-sm text-center ml-2",
                        {
                            "disabled": message === "",
                            "loading": loading
                        }
                    )}
                    disabled={message === "" || loading}
                >
                    {loading ? (
                        <Loader /> 
                    ) : (
                        <IconWrap>
                            <Send width={24} height={24}/>
                        </IconWrap>
                    )}
                </Button>
            </FormBox>
        </form>
    );
}

export default ChatForm;