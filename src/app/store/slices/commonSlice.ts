import { createSlice } from "@reduxjs/toolkit";
import { ContactData } from "app/api/get-contact";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ThemeTypes } from "app/components/App/app-types";
import { UserData } from "app/components/AuthorizationForm/AuthorizationForm";

export type MessageData = {
    typeWebhook: "outgoingMessageReceived" | "incomingMessageReceived",
    chatId?: string,
    instanceData: {
        idInstance: string,
        wid: string
    },
    timestamp: number,
    idMessage: string,
    senderData: {
        chatId: string,
        sender: string,
        senderName?: string
    },
    messageData:{
        typeMessage: "textMessage",
        textMessageData:{
            textMessage: string
        }
    }
};
export type ChatData = ContactData & {
    messages: MessageData[];
};

type ChatsType = Record<string, ChatData>; 

type StateProps = {
    chats: ChatsType;
    theme: ThemeTypes;
    user: UserData | null;
    currentChat: string | null;
};

const name = 'common';
const initialState: StateProps = {
    currentChat: null,
    theme: 'default',
    user: null,
    chats: {},
};

const commonSlice = createSlice({
    name, initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<ThemeTypes>) => ({...state, theme: action.payload}),
        setUser: (state, action: PayloadAction<UserData | null>) => ({...state, user: action.payload}),
        setChat: (state, action: PayloadAction<string | null>) => ({...state, currentChat: action.payload}),
        addChat: (state, action: PayloadAction<ChatsType>) => ({...state, chats: {...action.payload, ...state.chats}}),
        addMessage: (state, action: PayloadAction<MessageData>) => {
            const currentChatId = action.payload.chatId || action.payload.senderData.chatId;
            const currentChat = state.chats[currentChatId];

            if (!currentChat) return state;

            return {
                ...state,
                chats: {
                    ...state.chats,
                    [currentChatId]: {
                        ...currentChat,
                        messages: [
                            ...currentChat.messages,
                            action.payload
                        ]
                    }
                }
            };
        }
    },
});

export const commonActions = commonSlice.actions;
export default commonSlice.reducer;