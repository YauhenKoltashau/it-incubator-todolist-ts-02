//root reducer
import {combineReducers} from "redux";
import {tasksReducer, todolistsReducer} from "../features/TodolistList";
import {appReducer} from "./index";
import {authReducer, loginReducer} from "../features/Login";

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer,
    auth: authReducer
})