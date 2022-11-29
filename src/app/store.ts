import {combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer, todolistsReducer} from "../features/TodolistList";
import {authReducer, loginReducer} from "../features/Login";
import {appReducer} from "./";

//root reducer
export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer,
    auth: authReducer
})
//root store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})
// export type AppDispatchType = typeof store.dispatch
// @ts-ignore
window.store = store


// export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware))

//root types

//actions type

// | LoginActionsType
// | AuthActionsType
//state type

//reducer type

// export type AppDispatch = typeof store.dispatch
//dispatch type

// thunk type

// export type AppDispatch = any


