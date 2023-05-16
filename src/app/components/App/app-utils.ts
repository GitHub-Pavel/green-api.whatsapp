import _ from "lodash";
import { ThemeTypes } from "./app-types";
import { getWindowsTheme } from "app/utils";

export const changeAppTheme = ( storeTheme: ThemeTypes ) => {
    const classnames = {
        light: 'light-theme',
        dark: 'dark-theme'
    };

    _.forIn(classnames, (themeClass, themeName) => {
        const theme = storeTheme === "default" ? getWindowsTheme() : storeTheme;
        
        if (themeName !== theme)
            return document.body.classList.remove(themeClass);
        document.body.classList.add(themeClass);
    });
}