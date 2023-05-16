import type { FC } from "react";
import { ReactNode } from "react";
import { styled } from "styled-components";

type LayoutProps = {
    children: ReactNode;
}

const Wrap = styled.div`
    z-index: 2;
    display: flex;
    cursor: default;
    min-height: 100vh;
    position: relative;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;

    @media screen and (max-width: 1095px) {
        box-sizing: border-box;
        padding-right: 36px;
        padding-left: 36px;
    }

    @media screen and (max-width: 660px) {
        position: relative;
        padding: 0;
    }
`;

const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <Wrap>{children}</Wrap>
    );
};

export default Layout;