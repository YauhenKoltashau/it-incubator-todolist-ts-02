import React from "react";
import {
    BrowserRouterDecorator,
    ReduxStoreProviderDecorator
} from "../../stories/decorators/ReduxStoreProviderDecorator";
import AppWithReducers from "./AppWithReducers";


export default {
    title: 'AppWithReducers',
    component: AppWithReducers,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
}

export const TestAppWithReducer = () => {
    return(
            <AppWithReducers demo={true}/>
    )
}