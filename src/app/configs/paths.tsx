import { AuthPage, ChatPage } from "app/pages";
import { Navigate } from "react-router-dom";

export type PageType = {
    key: string;
    path: string;
    element: JSX.Element;
};

export const authorized: PageType[] = [
    {
        path: '/green-api.whatsapp/',
        key: 'home',
        element: <Navigate to="/green-api.whatsapp/chat" replace />
    },
    {
        key: 'chat',
        path: '/green-api.whatsapp/chat',
        element: <ChatPage />
    }
];

export const unauthorized: PageType[] = [
    {
        path: '/green-api.whatsapp/',
        key: 'auth',
        element: <AuthPage />
    }
];