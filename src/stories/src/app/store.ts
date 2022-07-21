import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TasksActionsType, TasksReducer} from "../../../tasks-reducer";
import {TodolistsReducer, TodolistTypeAC} from "../../../todolists-reducer";
import thunkMiddleware, {ThunkAction,ThunkDispatch} from "redux-thunk";


const rootReducer = combineReducers({
    todolists: TodolistsReducer,
    tasks: TasksReducer
})
export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware))
export type AppActionsType = TodolistTypeAC | TasksActionsType
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