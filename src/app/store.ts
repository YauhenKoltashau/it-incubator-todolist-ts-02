import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TasksActionsType, TasksReducer} from "../features/TodolistList/tasks-reducer";
import {TodolistsReducer, TodolistTypeAC} from "../features/TodolistList/todolists-reducer";
import thunkMiddleware, {ThunkAction,ThunkDispatch} from "redux-thunk";
import {AppReducer, AppReducerActionsType} from "./app-reducer";
import {LoginActionsType, LoginReducer} from "../features/Login/login-reducer";
import {AuthActionsType, AuthReducer} from "../features/Auth/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    todolists: TodolistsReducer,
    tasks: TasksReducer,
    app: AppReducer,
    login: LoginReducer,
    auth: AuthReducer
})
// export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware))
export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) =>getDefaultMiddleware().prepend(thunkMiddleware)
        })
export type AppActionsType = TodolistTypeAC | TasksActionsType | AppReducerActionsType | LoginActionsType | AuthActionsType
export type AppRootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppRootState,unknown,AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootState,
    unknown,
    AppActionsType
    >
// export type AppDispatch = any

// @ts-ignore
window.store = store