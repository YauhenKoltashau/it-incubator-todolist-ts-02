import React from "react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";


export default {
    title: 'App Stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

export const TestAppBaseExample = () => {
    return(
            <App demo={false}/>
    )
}