import { authorized, unauthorized } from "app/configs/paths";
import { changeAppTheme } from "./app-utils";
import { Route, Routes } from "react-router";
import { useAppSelector } from "app/hooks";
import { NotFound } from "app/pages";
import WebFont from "webfontloader";
import { useEffect } from "react";
import type { FC }  from "react";

const App: FC = () => {
    const { theme, user } = useAppSelector((store) => store.common);
    const paths = user ? authorized : unauthorized;

    useEffect(() => {changeAppTheme(theme)}, [theme]);
    useEffect(() => {
        WebFont.load({
            google: {
              families: ['Roboto']
            }
        });
    }, [])
    

    return (
        <Routes>
            {paths.map((page) => <Route {...page} />)}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;