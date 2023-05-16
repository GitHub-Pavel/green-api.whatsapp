import { AuthorizationForm, Layout, Logo } from "app/components";
import { styled } from "styled-components";
import { FC } from "react"

const Plate = styled.div`
    position: absolute;
    top: 0;
    z-index: -1;
    width: 100%;
    height: 222px;
    background-color: #00a884;
`;

const Header = styled.div`
    width: 700px;
    display: flex;
    margin: 0 auto;
    align-items: center;
    padding: 42px 0 28px;

    @media screen and (min-height: 760px) and (min-width:1095px) {
        padding-bottom: 66px;
    }

    @media screen and (min-height: 760px) and (min-width:780px) and (max-width:1095px) {
        padding-bottom: 68px;
    }

    @media screen and (max-width: 795px) {
        width: 100%;
    }

    @media screen and (max-width: 660px) {
        box-sizing: border-box;
        padding-right: 36px;
        padding-left: 36px;
    }
`;

const Wrap = styled.div`
    margin-right: auto;
    margin-left: auto;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 17px 50px 0 rgba(11,20,26,.19), 0 12px 15px 0 rgba(11,20,26,.24);
    z-index: 2;
    display: flex;
    flex: none;
    flex-direction: column;
    width: 700px;
    overflow: hidden;
    padding: 58px 80px 58px 52px;

    @media screen and (max-width: 660px) {
        border-radius: 0;
    }

    @media screen and (max-width: 795px) {
        width: 100%;
    }
`;

const Title = styled.div`
    font-weight: 400;
    font-size: 30px;

    @media screen and (max-width: 795px) {
        font-size: 24px;
    }
`;

const AuthPage: FC = () => {
    return (
        <Layout>
            <Plate />
            <Header>
                <Logo />
            </Header>
            <Wrap>
                <Title className="text-gray-800 mb-12">Enter your data from <span className="text-strong">GREEN-API</span></Title>
                <AuthorizationForm />
            </Wrap>
        </Layout>
    )
}

export default AuthPage;