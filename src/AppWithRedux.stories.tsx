import React from "react";
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";


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