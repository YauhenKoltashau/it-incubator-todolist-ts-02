import {todolistAPI} from "../../api/todolist-api";
import {createAsyncThunk, createSlice, PayloadAction,} from "@reduxjs/toolkit";
import {handleAsyncServerAppError, handleAsyncServerNetworkError,} from "../../utils/error-utils";
import {ThunkError} from "../../utils/types";
import {TodolistType} from "../../api/types";
import {appActions} from "../../app";
import {activeAppStatusLoading, activeAppStatusSucceded} from "../../common/AppCommonActions";
import {AppStatusType} from "../../app/appTypes";
import {FilterValuesType, TodolistDomainType} from "./todolists-TasksTypes";

//state
const fetchTodolistsThunk = createAsyncThunk<{ todolists: TodolistType[] }, void, ThunkError>('todo/fetchTodolists', async (param, thunkAPI) => {
    const dispatch = thunkAPI.dispatch
    // dispatch(appActions.setAppStatusAC({status: 'loading'}))
    activeAppStatusLoading(dispatch)
    try {
        const res = await todolistAPI.getTodolists()
        // dispatch(appActions.setAppStatusAC({status: 'succeded'}))
        activeAppStatusSucceded(dispatch)
        return {todolists: res.data}
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    } finally {
        // dispatch(appActions.setAppStatusAC({status: 'succeded'}))
        activeAppStatusSucceded(dispatch)
    }
})
const removeTodolistThunk = createAsyncThunk<{ id: string }, { todolistId: string }, ThunkError>('todo/removeTodolist', async (param: { todolistId: string }, thunkAPI
) => {
    const dispatch = thunkAPI.dispatch
    dispatch(appActions.setAppStatusAC({status: 'loading'}))
    try {
        dispatch(changeTodolistEntityStatusAC({id: param.todolistId, status: 'loading'}))
        const res = await todolistAPI.deleteTodolist(param.todolistId)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatusAC({status: 'succeded'}))
            return {id: param.todolistId}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, dispatch)
    } finally {
        dispatch(appActions.setAppStatusAC({status: 'succeded'}))
    }
})
const addTodolistThunk = createAsyncThunk<{ todolist: TodolistType }, // return try {todolist: TodolistType}
    { title: string }, // enter data
    ThunkError>('todo/addTodolist', async (param, thunkAPI
) => {
    const dispatch = thunkAPI.dispatch
    dispatch(appActions.setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistAPI.createTodolist(param.title)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatusAC({status: 'succeded'}))
            return {todolist: res.data.data.item}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, false)
        }
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, thunkAPI)
    } finally {
        dispatch(appActions.setAppStatusAC({status: 'succeded'}))
    }
})
const changeTodolistTitleThunk = createAsyncThunk<{ id: string, title: string }, { todolistId: string, title: string }, ThunkError>('todo/changeTodolistTitle', async (param: { todolistId: string, title: string },
                                                                                                                                                                       thunkAPI) => {
    const dispatch = thunkAPI.dispatch
    dispatch(appActions.setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistAPI.updateTodolist(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatusAC({status: 'succeded'}))
            return {id: param.todolistId, title: param.title}

        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, thunkAPI)
    } finally {
        dispatch(appActions.setAppStatusAC({status: 'succeded'}))
    }
})

export const asyncActions = {
    fetchTodolistsThunk,
    removeTodolistThunk,
    addTodolistThunk,
    changeTodolistTitleThunk
}
//slice
export const slice = createSlice({
    name: 'todo',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: AppStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        changeFilterTodolist(state, action: PayloadAction<{ filter: FilterValuesType, id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        }
        // setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
        //     return action.payload.todolists.map(tl => ({...tl, filter: 'All', entityStatus: "idle"}))
        // },
        // addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
        //     state.unshift({...action.payload.todolist, filter: 'All', entityStatus: "idle"})
        // },
        // removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
        //     //1
        //     const index = state.findIndex(tl => tl.id === action.payload.id)
        //     if (index > -1) {
        //         state.splice(index, 1)
        //     }
        //     //2
        //     // return state.filter((tl) => tl.id !== action.payload.id)
        // },
        // changeTitleTodolistAC(state, action: PayloadAction<{ id: string, title: string }>) {
        //     const index = state.findIndex(tl => tl.id === action.payload.id)
        //     state[index].title = action.payload.title
        // },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolistsThunk.fulfilled, (state, action) => {
                return action.payload.todolists.map(tl => ({...tl, filter: 'All', entityStatus: "idle"}))
            })
            .addCase(removeTodolistThunk.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                if (index > -1) {
                    state.splice(index, 1)
                }
                //2
                // return state.filter((tl) => tl.id !== action.payload.id)
            })
            .addCase(addTodolistThunk.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'All', entityStatus: "idle"})
            })
            .addCase(addTodolistThunk.rejected, (state, action) => {
                // alert(action.meta.arg.title)
            })
            .addCase(changeTodolistTitleThunk.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].title = action.payload.title
            })
    }
})

//reducer
const {
    changeTodolistEntityStatusAC,
} = slice.actions

//thunks
//old
// export const _fetchTodolistsThunk = (): AppThunk => async (dispatch) => {
//     try {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         const res = await todolistAPI.getTodolists()
//         dispatch(setTodolistsAC({todolists: res.data}))
//         dispatch(setAppStatusAC({status: 'succeded'}))
//     } catch (error) {
//         handleServerNetworkError(error, dispatch)
//     } finally {
//         dispatch(setAppStatusAC({status: 'succeded'}))
//     }
// }
// export const _removeTodolistThunk = (todolistId: string): AppThunk => async (dispatch) => {
//     try {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
//         const res = await todolistAPI.deleteTodolist(todolistId)
//         if (res.data.resultCode === 0) {
//             dispatch(removeTodolistAC({id: todolistId}))
//             dispatch(setAppStatusAC({status: 'succeded'}))
//         } else (
//             handleServerAppError(res.data, dispatch)
//         )
//     } catch (error) {
//         handleServerNetworkError(error, dispatch)
//     } finally {
//         dispatch(setAppStatusAC({status: 'succeded'}))
//     }
// }
// export const _addTodolistThunk = (title: string): AppThunk => async (dispatch) => {
//     try {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         const res = await todolistAPI.createTodolist(title)
//         if (res.data.resultCode === 0) {
//             dispatch(addTodolistAC({todolist: res.data.data.item}))
//             dispatch(setAppStatusAC({status: 'succeded'}))
//         } else (
//             handleServerAppError(res.data, dispatch)
//         )
//     } catch (error) {
//         handleServerNetworkError(error, dispatch)
//     } finally {
//         dispatch(setAppStatusAC({status: 'succeded'}))
//     }
// }
// export const _changeTodolistTitleThunk = (todolistId: string, title: string): AppThunk => async (dispatch) => {
//     try {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         const res = await todolistAPI.updateTodolist(todolistId, title)
//         if (res.data.resultCode === 0) {
//             dispatch(changeTitleTodolistAC({id: todolistId, title}))
//             dispatch(setAppStatusAC({status: 'succeded'}))
//         } else (
//             handleServerAppError(res.data, dispatch)
//         )
//     } catch (error) {
//         handleServerNetworkError(error, dispatch)
//     } finally {
//         dispatch(setAppStatusAC({status: 'succeded'}))
//     }
// }


//  | ReturnType<typeof removeTodolistAC>
//  | ReturnType<typeof addTodolistAC>
//  | ReturnType<typeof changeTitleTodolistAC>
//  | ReturnType<typeof setTodolistsAC>


