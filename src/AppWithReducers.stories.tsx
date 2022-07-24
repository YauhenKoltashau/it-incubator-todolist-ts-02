import React from "react";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";
import AppWithReducers from "./AppWithReducers";


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