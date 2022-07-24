import {v1} from "uuid";
import {todolistAPI, TodolistType} from "./stories/src/api/todolist-api";
import {AppActionsType, AppThunk} from "./stories/src/app/store";
import {AppStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "./stories/src/utils/error-utils";

export type TodolistTypeAC =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTitleTodolistAC>
    | ReturnType<typeof changeFilterTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

export let todolistId_1 = v1()
export let todolistId_2 = v1()

let initialState1: Array<TodolistDomainType> = []

// .then((res)=>{[...initialState,res.data]})
export const TodolistsReducer = (state: Array<TodolistDomainType> = initialState1, action: AppActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter((tl) => tl.id !== action.id)
        case "ADD-TODOLIST":
            let newState: TodolistDomainType = {...action.todolist,filter: 'All',entityStatus: "idle"}
            return [newState, ...state]
        case "CHANGE-TODOLIST-TITLE":
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        case "CHANGE-TODOLIST-FILTER":
            return state.map((tl) => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLISTS": {
            return action.todolists.map((tl) => ({...tl, filter: 'All', entityStatus: "idle"}))
        }
        case "CHANGE-ENTITY-STATUS":
            return[...state.map(tl=>tl.id === action.id?{...tl,entityStatus:action.status}:tl)]

        default:
            return state

    }

}

export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export const changeTitleTodolistAC = ( id: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    id: id,
    title: title
} as const)
export const changeFilterTodolistAC = (filter: FilterValuesType, id: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter
} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists: todolists} as const)
export const changeTodolistEntityStatusAC = (id: string, status: AppStatusType) => ({type: 'CHANGE-ENTITY-STATUS',id, status} as const)
// export const updateTaskAC = (taskId: string, model: UpdateTaskModelType, todolistId: string)=>({type: 'UPDATE-TASK', model, todolistId, taskId}as const)

export type FilterValuesType = "All" | "Active" | "Completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: AppStatusType
}

export const fetchTodolistsThunk = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    return todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeded'))

        })
        .catch((error)=>{
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTodolistThunk = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId,'loading'))
    return todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            if(res.data.resultCode === 0){
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeded'))
            } else (
                handleServerAppError(res.data, dispatch)
            )
        })
        .catch((error)=>{
            handleServerNetworkError(error, dispatch)
        })
}
export const addTodolistThunk = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    return todolistAPI.createTodolist(title)
        .then((res) => {
            if(res.data.resultCode === 0){
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeded'))
            }else (
                handleServerAppError(res.data, dispatch)
            )
        })
        .catch((error)=>{
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodolistTitleThunk = (todolistId: string, title: string ): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    return todolistAPI.updateTodolist(todolistId,title)
        .then((res) => {
            if(res.data.resultCode === 0){
                dispatch(changeTitleTodolistAC(todolistId,title))
                dispatch(setAppStatusAC('succeded'))
            }else (
                handleServerAppError(res.data, dispatch)
            )
        })
        .catch((error)=>{
            handleServerNetworkError(error, dispatch)
        })
}



