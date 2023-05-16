import { ThemeTypes } from "app/components/App/app-types"

export const getWindowsTheme = (): ThemeTypes => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return "dark";
    }

    return "light";
}