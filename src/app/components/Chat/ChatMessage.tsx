import { useAppSelector } from "app/hooks";
import { MessageData } from "app/store/slices/commonSlice";
import type { FC } from "react";
import { styled } from "styled-components";

type MessageProps = {
    message: MessageData;
}

const IncomingWrap = styled.div`
    background-color: var(--incoming-background);
    
    @media screen and (max-width: 900px) {
        max-width:95%;
    }

    @media screen and (min-width: 901px) and (max-width:1024px) {
        max-width:85%;
    }

    @media screen and (min-width: 1025px) and (max-width:1300px) {
        max-width:75%;
    }

    @media screen and (min-width: 1301px) {
        max-width:65%;
    }
`;

const OutgoingWrap = styled.div`
    background-color: var(--outgoing-background);

    @media screen and (max-width: 900px) {
        max-width:95%;
    }

    @media screen and (min-width: 901px) and (max-width:1024px) {
        max-width:85%;
    }

    @media screen and (min-width: 1025px) and (max-width:1300px) {
        max-width:75%;
    }

    @media screen and (min-width: 1301px) {
        max-width:65%;
    }
`;

const TimeText = styled.p`
    color: var(--bubble-meta);
`;

const ChatMessage: FC<MessageProps> = ({message}) => {
    const date = new Date(message.timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const formattedTime = hours + ':' + minutes.substr(-2);
    const user = useAppSelector((store) => store.common.user);

    if (!user || !message.senderData || !message.messageData) return null;

    if (message.senderData.sender !== user.wid) return (
        <div className="flex mb-2">
            <IncomingWrap className="rounded py-1 px-2">
                <p className="text-sm mt-1">{message.messageData.textMessageData.textMessage}</p>
                <p className="text-right text-xs mt-1 ">{formattedTime}</p>
            </IncomingWrap>
        </div>
    );

    return (
        <div className="flex justify-end mb-2">
            <OutgoingWrap className="rounded py-1 px-2">
                <p className="text-sm mt-1">{message.messageData.textMessageData.textMessage}</p>
                <TimeText className="text-right text-xs mt-1">{formattedTime}</TimeText>
            </OutgoingWrap>
        </div>
    );
};

export default ChatMessage;