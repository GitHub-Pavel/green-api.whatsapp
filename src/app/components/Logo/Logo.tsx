import type { FC } from "react";
import { styled } from "styled-components";

const LogoText = styled.div`
    color: #fff;
    font-size: 15px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.5px;
    text-transform: uppercase;
`;

const Logo: FC = () => {
    return (
        <LogoText>Green-API WhatsApp</LogoText>
    );
};

export default Logo;