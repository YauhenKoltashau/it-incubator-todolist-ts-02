import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TasksReducer} from "../features/TodolistList/tasks-reducer";
import {TodolistsReducer, TodolistTypeAC} from "../features/TodolistList/todolists-reducer";
import thunkMiddleware, {ThunkAction,ThunkDispatch} from "redux-thunk";
import {AppReducer, AppReducerActionsType} from "./app-reducer";
import {
    // LoginActionsType,
    LoginReducer} from "../features/Login/login-reducer";
import {AuthReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

//root reducer
const rootReducer = combineReducers({
    todolists: TodolistsReducer,
    tasks: TasksReducer,
    app: AppReducer,
    login: LoginReducer,
    auth: AuthReducer
})

//root store
// export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware))
export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) =>getDefaultMiddleware().prepend(thunkMiddleware)
        })
//root types
export type AppDispatchType = typeof store.dispatch
        //actions type
export type AppActionsType =
    | TodolistTypeAC
    // | TasksActionsType
    | AppReducerActionsType
    // | LoginActionsType
    // | AuthActionsType
        //state type
export type AppRootState = ReturnType<typeof store.getState>
        //reducer type
export type RootReducerType = typeof rootReducer
// export type AppDispatch = typeof store.dispatch
        //dispatch type
export type AppDispatch = ThunkDispatch<AppRootState,unknown,AppActionsType>
        // thunk type
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootState,
    unknown,
    AppActionsType
    >
// export type AppDispatch = any

// @ts-ignore
window.store = store