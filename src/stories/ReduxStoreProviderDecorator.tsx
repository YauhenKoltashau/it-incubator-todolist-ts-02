import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'

import {TasksReducer} from "../tasks-reducer";
import {TodolistsReducer} from "../todolists-reducer";
import {AppRootState} from "./src/app/store";
import {TaskPriorities, TaskStatuses} from "./src/api/tasks-api";
import {AppReducer} from "../app-reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todolists: TodolistsReducer,
    app: AppReducer
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
        status:'idle',
        error: null
    }

};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState,applyMiddleware(thunkMiddleware));

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
