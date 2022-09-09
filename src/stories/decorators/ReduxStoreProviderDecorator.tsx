import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'

import {TasksReducer} from "../../features/TodolistList/tasks-reducer";
import {TodolistsReducer} from "../../features/TodolistList/todolists-reducer";
import {AppRootState, RootReducerType} from "../../app/store";
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";
import {AppReducer} from "../../app/app-reducer";
import thunkMiddleware from "redux-thunk";
import {LoginReducer} from "../../features/Login/login-reducer";
import {AuthReducer} from "../../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {BrowserRouter, HashRouter} from "react-router-dom";

const rootReducer: RootReducerType = combineReducers({
    tasks: TasksReducer,
    todolists: TodolistsReducer,
    app: AppReducer,
    login: LoginReducer,
    auth: AuthReducer
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
