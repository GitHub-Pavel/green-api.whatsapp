import type { FC } from "react";
import User from "app/icons/user.svg";
import { styled } from "styled-components";
import ContentLoader from "react-content-loader";
import { ContactData } from "app/api/get-contact";
import { UserData } from "../AuthorizationForm/AuthorizationForm";

type AvatarProps = {
    contact: ContactData | UserData;
    avatarSize?: number;
};

const Icon = styled.div`
    svg {
        fill: transparent;
        stroke: var(--primary);
    }
`;

const Avatar: FC<AvatarProps> = ({contact, avatarSize = 40}) => {
    if (!contact)
        return (
            <ContentLoader
                speed={2}
                width={avatarSize}
                height={avatarSize}
                viewBox={`0 0 ${avatarSize} ${avatarSize}`}
                backgroundColor="var(--app-background-deeper)"
                foregroundColor="var(--app-background)"
            >
                <rect x="0" y="0" rx={avatarSize} ry={avatarSize} width={avatarSize} height={avatarSize} /> 
            </ContentLoader>
        );

    if (contact && contact.avatar !== "")
        return (
            <img 
                className="rounded-full" 
                src={contact.avatar}
                height={avatarSize}
                width={avatarSize}
                alt={contact.name} 
            />
        );

    return (
        <Icon>
            <User 
                width={avatarSize}
                height={avatarSize}
            />
        </Icon>
    );
};

export default Avatar;