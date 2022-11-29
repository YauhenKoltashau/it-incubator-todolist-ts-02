import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers} from 'redux'

import thunkMiddleware from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {HashRouter} from "react-router-dom";
import {AppRootState, RootReducerType} from "../../utils/types";
import {TaskPriorities, TaskStatuses} from "../../api/types";
import {tasksReducer, todolistsReducer} from "../../features/TodolistList";
import {authReducer, loginReducer} from "../../features/Login";
import {appReducer} from "../../app";

const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    login: loginReducer,
    auth: authReducer
})

const initialGlobalState:AppRootState = {
    todolists: [
        {id: "todolistId1", addedDate:'',order: 0, title: 'What to almost learn',filter: 'All', entityStatus: "idle"},
        {id: "todolistId2", addedDate:'',order: 0, title: 'What to almost learn', filter: 'All', entityStatus: "loading"}

    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: "taskId1", title: 'What to almost learn',description: '',todoListId: 'todolistId1',order: 0, status: TaskStatuses.New, priority:TaskPriorities.Low,startDate:'', deadline:'', addedDate:''},
            {id: "taskId2", title: 'What to almost',description: '',todoListId: 'todolistId1',order: 0, status: TaskStatuses.New, priority:TaskPriorities.Low,startDate:'', deadline:'', addedDate:''}
        ],
        ["todolistId2"]: [
            {id: "taskId1", title: 'What',description: '',todoListId: 'todolistId2',order: 0, status: TaskStatuses.New, priority:TaskPriorities.Low,startDate:'', deadline:'', addedDate:''},
            {id: "taskId2", title: 'Why',description: '',todoListId: 'todolistId2',order: 0, status: TaskStatuses.New, priority:TaskPriorities.Low,startDate:'', deadline:'', addedDate:''}
        ]
    },
    app: {
        isInitialized: true,
        status:'idle',
        error: null
    },
    login: {
        email: '',
        password: '',
        rememberMe: false
    },
    auth: {
        id: null,
        login: null,
        email: null,
        isAuth: false

    },

};

// export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState,applyMiddleware(thunkMiddleware));

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState:initialGlobalState,
    middleware:(getDefaultMiddleware) =>getDefaultMiddleware().prepend(thunkMiddleware)
})

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

export const BrowserRouterDecorator = (storyFn: any) => (
    <HashRouter>{storyFn()}
    </HashRouter>)
