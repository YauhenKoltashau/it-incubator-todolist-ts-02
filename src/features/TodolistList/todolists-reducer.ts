import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {AppThunk} from "../../app/store";
import {AppStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//state
let initialState: Array<TodolistDomainType> = []

//slice
const slice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
        setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'All', entityStatus: "idle"}))
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: AppStatusType }>) {
            const index = state.findIndex(tl=>tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'All', entityStatus: "idle"})
        },
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            //1
            const index = state.findIndex(tl=>tl.id === action.payload.id)
            if(index > -1){
                state.splice(index, 1)
            }
            //2
            // return state.filter((tl) => tl.id !== action.payload.id)
        },
        changeTitleTodolistAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl=>tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeFilterTodolistAC(state, action: PayloadAction<{ filter: FilterValuesType, id: string }>) {
            const index = state.findIndex(tl=>tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        }
    }
})

//reducer
export const TodolistsReducer = slice.reducer
export const {
    setTodolistsAC,
    changeTodolistEntityStatusAC,
    addTodolistAC,
    removeTodolistAC,
    changeTitleTodolistAC,
    changeFilterTodolistAC
} = slice.actions

//thunks
export const fetchTodolistsThunk = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistAPI.getTodolists()
        dispatch(setTodolistsAC({todolists: res.data}))
        dispatch(setAppStatusAC({status: 'succeded'}))
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppStatusAC({status: 'succeded'}))
    }
}
export const removeTodolistThunk = (todolistId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
        const res = await todolistAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            dispatch(removeTodolistAC({id: todolistId}))
            dispatch(setAppStatusAC({status: 'succeded'}))
        } else (
            handleServerAppError(res.data, dispatch)
        )
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppStatusAC({status:'succeded'}))
    }
}
export const addTodolistThunk = (title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(addTodolistAC({todolist: res.data.data.item}))
            dispatch(setAppStatusAC({status: 'succeded'}))
        } else (
            handleServerAppError(res.data, dispatch)
        )
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppStatusAC({status: 'succeded'}))
    }
}
export const changeTodolistTitleThunk = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistAPI.updateTodolist(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(changeTitleTodolistAC({id:todolistId, title}))
            dispatch(setAppStatusAC({status: 'succeded'}))
        } else (
            handleServerAppError(res.data, dispatch)
        )
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppStatusAC({status: 'succeded'}))
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

