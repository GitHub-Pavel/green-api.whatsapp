import { AuthPage, ChatPage } from "app/pages";
import { Navigate } from "react-router-dom";

export type PageType = {
    key: string;
    path: string;
    element: JSX.Element;
};

export const authorized: PageType[] = [
    {
        key: 'home',
        path: process.env.DEPLOY_URL+'/',
        element: <Navigate to={process.env.DEPLOY_URL+"/chat"} replace />
    },
    {
        key: 'chat',
        element: <ChatPage />,
        path: process.env.DEPLOY_URL+'/chat',
    }
];

export const unauthorized: PageType[] = [
    {
        key: 'auth',
        element: <AuthPage />,
        path: process.env.DEPLOY_URL+'/',
    }
];