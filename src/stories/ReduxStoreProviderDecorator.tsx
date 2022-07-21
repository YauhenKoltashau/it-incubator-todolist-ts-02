import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'


import {v1} from 'uuid'

import {TasksReducer} from "../tasks-reducer";
import {TodolistDomainType, TodolistsReducer} from "../todolists-reducer";
import {AppRootState} from "./src/app/store";
import {TaskPriorities, TaskStatuses} from "./src/api/tasks-api";

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todolists: TodolistsReducer
})

const initialGlobalState:AppRootState = {
    todolists: [
        {id: "todolistId1", addedDate:'',order: 0, title: 'What to almost learn',filter: "All"},
        {id: "todolistId2", addedDate:'',order: 0, title: 'What to almost learn',filter: "All"}

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
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
