import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {AppActionsType, AppThunk} from "../../app/store";
import {AppStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

//state
let initialState1: Array<TodolistDomainType> = []

//reducer
export const TodolistsReducer = (state: Array<TodolistDomainType> = initialState1, action: AppActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter((tl) => tl.id !== action.id)
        case "ADD-TODOLIST":
            let newState: TodolistDomainType = {...action.todolist, filter: 'All', entityStatus: "idle"}
            return [newState, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map((tl) => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLISTS":
            return action.todolists.map((tl) => ({...tl, filter: 'All', entityStatus: "idle"}))
        case "CHANGE-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        default:
            return state

    }

}

//actions
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export const changeTitleTodolistAC = (id: string, title: string) => ({ type: "CHANGE-TODOLIST-TITLE", id, title } as const)
export const changeFilterTodolistAC = (filter: FilterValuesType, id: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists: todolists} as const)
export const changeTodolistEntityStatusAC = (id: string, status: AppStatusType) => ({
    type: 'CHANGE-ENTITY-STATUS',
    id,
    status
} as const)

//thunks
export const fetchTodolistsThunk = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todolistAPI.getTodolists()
        dispatch(setTodolistsAC(res.data))
        dispatch(setAppStatusAC('succeded'))
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeded'))
    }
}
export const removeTodolistThunk = (todolistId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        const res = await todolistAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeded'))
        } else (
            handleServerAppError(res.data, dispatch)
        )
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeded'))
    }
}
export const addTodolistThunk = (title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todolistAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeded'))
        } else (
            handleServerAppError(res.data, dispatch)
        )
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeded'))
    }
}
export const changeTodolistTitleThunk = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await todolistAPI.updateTodolist(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(changeTitleTodolistAC(todolistId, title))
            dispatch(setAppStatusAC('succeded'))
        } else (
            handleServerAppError(res.data, dispatch)
        )
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppStatusAC('succeded'))
    }
}

//types
export type FilterValuesType = "All" | "Active" | "Completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: AppStatusType
}
export type TodolistTypeAC =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTitleTodolistAC>
    | ReturnType<typeof changeFilterTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

