import { AuthPage, ChatPage } from "app/pages";
import { Navigate } from "react-router-dom";

export type PageType = {
    key: string;
    path: string;
    element: JSX.Element;
};

export const authorized: PageType[] = [
    {
        path: '/',
        key: 'home',
        element: <Navigate to="/chat" replace />
    },
    {
        key: 'chat',
        path: '/chat',
        element: <ChatPage />
    }
];

export const unauthorized: PageType[] = [
    {
        path: '/',
        key: 'auth',
        element: <AuthPage />
    }
];