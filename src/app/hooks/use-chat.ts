import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import { ChatData, commonActions } from "app/store/slices/commonSlice";
import { deleteNotification, getContact, getStateInstance, receiveNotification } from "app/api";


export const useChat = () => {
    const dispatch = useAppDispatch();
    const [error, setError] = useState<boolean>(false); 
    const {user, chats} = useAppSelector((store) => store.common);
    const issetChat = async (chatId: string) => {
        if (!chats[chatId]) {
            const contact = await getContact(chatId, user);

            if (contact) {
                const currentContact: ChatData = {...contact, messages: []};
                dispatch(commonActions.addChat({[chatId]: currentContact}));
            }
        }
    };

    useEffect(() => {
        const int = setInterval(async () => {
            try {
                const response = await receiveNotification(user);
                const webhookBody = response && response.body;
                
                if (!webhookBody) return;

                if (webhookBody.typeWebhook === 'incomingMessageReceived' || webhookBody.typeWebhook === 'outgoingMessageReceived') {
                    await issetChat(webhookBody.senderData.chatId);
                    dispatch(commonActions.addMessage(webhookBody));
                }
                
                if (webhookBody.typeWebhook === 'stateInstanceChanged') {
                    const stateInstance = await getStateInstance(user);

                    if (stateInstance !== "authorized")
                        dispatch(commonActions.setUser(null));
                }

                if (response.receiptId)
                    await deleteNotification(user, response.receiptId);
            } catch (ex) {
                setError(true);
                console.error(ex);
            }
        }, 5000);

        return () => {
            clearInterval(int);
        };
    }, []);

    return error;
}