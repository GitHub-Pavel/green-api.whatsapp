import type { FC } from "react"
import { useEffect } from "react";
import { styled } from "styled-components";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Avatar, ChangeThemeInput, Chat, ChatsList, ContactForm, Layout } from "app/components";
import { deleteNotification, getContact, getStateInstance, receiveNotification } from "app/api";
import { commonActions } from "app/store";
import { ChatData } from "app/store/slices/commonSlice";
import classNames from "classnames";

const Content = styled.div`
    width: 100%;
    max-width: 1600px;
    padding: 20px 0;

    @media screen and (max-width: 660px) {
        padding: 0;
    }
`;

const Sidebar = styled.div`
    background-color: var(--background-default);
    width: 33.333333%;

    @media screen and (max-width: 1025px) {
        width: 40%;
    }

    @media screen and (max-width: 790px) {
        width: 290px;
    }
    
    @media screen and (max-width: 660px) {
        width: 100%;
    }
`;

const SidebarHeader= styled.header`
    background-color: var(--panel-header-background);
    justify-content: space-between;
`;

const ChatWrap = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    color: var(--primary);
    background-color: var(--intro-background);
    border-left: 1px solid var(--border-stronger);

    &::after {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0;
        content: "";
        border-top: 6px solid var(--intro-border);
    }
`;

const ChatContent = styled.div`
    position: relative;
    width: 66.666667%;

    @media screen and (max-width: 1025px) {
        width: 60%;
    }
    
    @media screen and (max-width: 790px) {
        width: auto;
        flex: 1 1;
    }
    
    @media screen and (max-width: 660px) {
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        display: none;

        .chat-active & {
            display: block;
        }
    }
`;

const ChatPage: FC = () => {
    const dispatch = useAppDispatch();
    const {user, currentChat, chats} = useAppSelector((store) => store.common);
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
                console.error(ex);
            }
        }, 5000);

        return () => {
            clearInterval(int);
        };
    }, []);

    if (!user) return null;

    return (
        <Layout>
            <Content className={classNames("flex flex-wrap h-screen", {"chat-active": currentChat})}>
                <Sidebar>
                    <SidebarHeader className="flex items-center space-x-4 px-3.5 py-2.5">
                        <Avatar contact={user}/>
                        <ChangeThemeInput />
                    </SidebarHeader>
                    <ContactForm />
                    <ChatsList />
                </Sidebar>

                <ChatContent>
                    <ChatWrap>
                        {!currentChat ? (
                            <div className="grid flex-1 place-items-center pt-24 px-6 lg:px-8 h-full">
                                <div className="text-center">
                                    <p className="font-semibold text-green">Green API WhatsApp</p>
                                    <h1 className="mt-4 text-3xl font-medium tracking-tight sm:text-5xl">Select chat</h1>
                                </div>
                            </div>
                        ) : (
                            <Chat />
                        )}
                    </ChatWrap>
                </ChatContent>
            </Content>
        </Layout>
    )
}

export default ChatPage;