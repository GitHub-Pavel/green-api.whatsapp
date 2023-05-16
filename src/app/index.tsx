import "./global.scss";
import * as React from "react";
import { store } from "app/store";
import { App } from "app/components";
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById('app');
const root = createRoot( container! ) ;

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);