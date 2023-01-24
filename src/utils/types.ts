import { store} from "../app/store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {FieldErrorType} from "../api/types";
import {AppReducerActionsType} from "../app/appTypes";
import {TodolistTypeAC} from "../features/TodolistList/todolists-TasksTypes";
import {rootReducer} from "../app/reducers";

export type RootReducerType = typeof rootReducer
export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootState,unknown,AppActionsType>
export type AppActionsType =
    | TodolistTypeAC
    | AppReducerActionsType
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootState,
    unknown,
    AppActionsType
    >
export type ThunkError = {rejectValue:{errors: string[], fieldsErrors?: Array<FieldErrorType>}}