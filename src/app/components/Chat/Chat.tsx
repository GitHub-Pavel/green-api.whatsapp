import { useAppDispatch, useAppSelector } from "app/hooks";
import type { FC } from "react";
import { useEffect } from "react";
import { styled } from "styled-components";
import { Avatar } from "../Avatar";
import { commonActions } from "app/store";
import ChatForm from "./ChatForm";
import ChatMessages from "./ChatMessages";

const Layout = styled.div`
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    background-color: var(--conversation-panel-background);

    &::before {
        z-index: -1;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.4;
        position: absolute;
        background-repeat: repeat;
        background-image: url(img/chat_bg.png);
    }

    .dark-theme &::before {
        opacity: 0.06;
    }
`;

const Header = styled.header`
    background-color: var(--panel-header-background);
`;

const Footer = styled.footer`
    background-color: var(--rich-text-panel-background);    
    padding: 5px 0;
    min-height: 62px;
`;

const CloseButton = styled.button`
    &:hover {
        background: rgba(var(--button-plain-background-hover-rgb), .8);
    }
`;

const Chat: FC = () => {
    const dispatch = useAppDispatch();
    const {chats, currentChat} = useAppSelector((store) => store.common);
    const chat = chats[currentChat as string];

    const closeHandler = () => {
        dispatch(commonActions.setChat(null));
    };

    if (!chat) return null;

    return (
        <Layout>
            <Header className="flex items-center justify-between px-3.5 py-2.5">
                <div className="space-x-3.5 flex items-center">
                    <Avatar contact={chat}/>
                    <p className="text-sm">{chat.name ? chat.name : "+"+chat.chatId.replace('@c.us','')}</p>
                </div>
                <CloseButton 
                    type="button" 
                    onClick={closeHandler} 
                    className=" rounded-full p-2 inline-flex items-center justify-center text-gray-400 focus:outline-none"
                >
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </CloseButton>
            </Header>
            <ChatMessages chat={chat}/>
            <Footer>
                <ChatForm />
            </Footer>
        </Layout>
    );
};

export default Chat;