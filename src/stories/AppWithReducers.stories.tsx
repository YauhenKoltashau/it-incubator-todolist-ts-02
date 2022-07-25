import React from "react";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import AppWithReducers from "../app/AppWithReducers";


export default {
    title: 'AppWithReducers',
    component: AppWithReducers,
    decorators: [ReduxStoreProviderDecorator]
}

export const TestAppWithReducer = () => {
    return(
            <AppWithReducers demo={true}/>
    )
}