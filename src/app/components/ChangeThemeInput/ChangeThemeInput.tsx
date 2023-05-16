import type { FC } from "react";
import Select from 'react-select';
import { commonActions } from "app/store";
import { styled } from "styled-components";
import { useAppDispatch, useAppSelector } from "app/hooks"
import { getCurrentThemeObject } from "./change-theme-unput-utils";

const Wrap = styled.div`
    display: flex;
    align-items: center;
`;

const options = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'default', label: 'System Deafult' },
];


const ChangeThemeInput: FC = () => {
    const dispatch = useAppDispatch();
    const storeTheme = useAppSelector((store) => store.common.theme);
    const themeHandler = (currentTheme: any) => {
        dispatch(commonActions.changeTheme(currentTheme.value));
    }

    return (
        <Wrap>
            <p className="mr-4 text-sm">Theme:</p>
            <Select
                value={getCurrentThemeObject( options, storeTheme )}
                onChange={themeHandler}
                options={options}
                styles={{
                    control: (baseStyles) => ({
                        ...baseStyles,
                        background: "transparent",
                        border: "1px solid var(--primary)",
                        minHeight: "24px",
                        minWidth: "140px",
                    }),
                    menu: (baseStyles) => ({
                        ...baseStyles,
                        background: "var(--background-default)",
                        boxShadow: "0 4px 8px var(--app-background-deeper)"
                    }),
                    singleValue: (baseStyles) => ({
                        ...baseStyles,
                        fontSize: "14px",
                        color: "var(--priamry)"
                    }),
                    valueContainer: (baseStyles) => ({
                        ...baseStyles,
                        padding: "0 6px",
                    }),
                    input: (baseStyles) => ({
                        ...baseStyles,
                        padding: 0,
                        margin: "0 2px"
                    }),
                    dropdownIndicator: (baseStyles) => ({
                        ...baseStyles,
                        padding: "6px 4px 6px 3px"
                    }),
                    option: (baseStyles) => ({
                        ...baseStyles,
                        fontSize: "14px",
                        padding: "8px",
                        minHeight: "28px",
                    })
                }} 
                theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary50: 'var(--app-background-deeper)',
                      primary25: 'var(--app-background-deeper)',
                      primary: 'var(--active-tab-marker)',
                    },
                })}
            />
        </Wrap>
    );
}

export default ChangeThemeInput;