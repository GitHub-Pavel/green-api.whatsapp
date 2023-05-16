import type { FC } from "react";
import { Avatar } from "../Avatar";
import { ChatData } from "app/store/slices/commonSlice";
import { styled } from "styled-components";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { commonActions } from "app/store";

type ChatsItemProps = {
    contact: ChatData;
}

const Button = styled.button`
    outline: none;

    &:not(.current):hover {
        background-color: var(--background-default-hover);
        box-shadow: none;
    }

    &.current {
        background-color: var(--background-default-active);
        pointer-events: none;
        cursor: default;
    }
`;

const ChatsItem: FC<ChatsItemProps> = ({contact}) => {
    const dispatch = useAppDispatch();
    const currentChat = useAppSelector((store) => store.common.currentChat);
    const clickHandler = () => {
        if (contact.chatId !== currentChat)
            dispatch(commonActions.setChat(contact.chatId))
    }

    return (
        <li>
            <Button
                onClick={clickHandler}
                className={classNames(
                    "flex items-center w-full p-4",
                    {
                        current: contact.chatId === currentChat
                    }
                )}
            >
                <Avatar contact={contact}/>
                <p className="ml-2 text-sm">{contact.name ? contact.name : "+"+contact.chatId.replace('@c.us','')}</p>
            </Button>
        </li>
    )
};

export default ChatsItem;