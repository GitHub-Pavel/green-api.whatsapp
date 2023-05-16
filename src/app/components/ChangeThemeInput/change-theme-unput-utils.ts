import { ThemeTypes } from "../App/app-types";

export const getCurrentThemeObject = (options: any, value: ThemeTypes) => {
    let currentValue: any = {};

    options.map((option: any) => {
        if (option.value === value) currentValue = option;
    });

    return currentValue;
}