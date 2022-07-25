import React from "react";
import AppWithRedux from "../app/AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


export default {
    title: 'AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const TestAppWithRedux = () => {
    return(
            <AppWithRedux demo={false}/>
    )
}