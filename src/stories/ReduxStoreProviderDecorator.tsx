import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'


import {v1} from 'uuid'

import {TasksReducer} from "../tasks-reducer";
import {TodolistsReducer} from "../todolists-reducer";
import {AppRootState} from "../store";

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todolists: TodolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", addedDate:"220315", order: 3, title: 'What to almost learn', filter: 'All'},
        {id: "todolistId2", addedDate:"945895", order: 55, title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
