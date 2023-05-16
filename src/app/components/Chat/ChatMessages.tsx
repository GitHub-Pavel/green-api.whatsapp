import { ChatData } from "app/store/slices/commonSlice";
import type { FC } from "react";
import ChatMessage from "./ChatMessage";
import { styled } from "styled-components";

type ChatProps = {
    chat: ChatData,
}

const MessagesWrap = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-right: 5px;
`;

const ChatMessages: FC<ChatProps> = ({chat}) => {
    return (
        <div className="flex-1 overflow-y-scroll scrollbar scrollbar-thin py-6 pr-12 pl-3.5 scrollbar-thumb-thumb scrollbar-track-track">
            <MessagesWrap>
                {chat.messages?.map((message) => (
                    <ChatMessage
                        message={message}
                        key={message.idMessage}
                    />
                ))}
            </MessagesWrap>
        </div>
    );
};

export default ChatMessages;