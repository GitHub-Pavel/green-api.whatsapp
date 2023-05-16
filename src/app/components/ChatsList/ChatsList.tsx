import { useAppSelector } from "app/hooks";
import type { FC } from "react";
import ChatsItem from "./ChatsItem";
import { ChatData } from "app/store/slices/commonSlice";

const ChatsList: FC = () => {
    const chats = useAppSelector((store) => store.common.chats);

    return (
        <ul>
            {Object.keys(chats).map((chat) => (
                <ChatsItem 
                    key={chats[chat]?.chatId}
                    contact={chats[chat] as ChatData}
                />
            ))}
        </ul>
    )
};

export default ChatsList;