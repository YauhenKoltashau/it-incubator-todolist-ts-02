import {combineReducers, createStore} from "redux";

import {TasksReducer} from "./tasks-reducer";
import {TodolistsReducer} from "./todolists-reducer";

export type AppRootState = ReturnType<typeof rootReducer>
const rootReducer = combineReducers({
    todolists: TodolistsReducer,
    tasks: TasksReducer
})
export const store = createStore(rootReducer)

// @ts-ignore
window.store = store