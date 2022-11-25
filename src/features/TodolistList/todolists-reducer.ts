import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {AppStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {action} from "@storybook/addon-actions";

//state
const fetchTodolistsThunk = createAsyncThunk('todo/fetchTodolists', async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistAPI.getTodolists()
        dispatch(setAppStatusAC({status: 'succeded'}))
        return {todolists: res.data}
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(setAppStatusAC({status: 'succeded'}))
    }
})
const removeTodolistThunk = createAsyncThunk('todo/removeTodolist', async (param: { todolistId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        dispatch(changeTodolistEntityStatusAC({id: param.todolistId, status: 'loading'}))
        const res = await todolistAPI.deleteTodolist(param.todolistId)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeded'}))
            return {id: param.todolistId}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(setAppStatusAC({status: 'succeded'}))
    }
})
const addTodolistThunk = createAsyncThunk('todo/addTodolist', async (param: { title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistAPI.createTodolist(param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeded'}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(param.title)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(param.title)
    } finally {
        dispatch(setAppStatusAC({status: 'succeded'}))
    }
})
const changeTodolistTitleThunk = createAsyncThunk('todo/changeTodolistTitle', async (param: { todolistId: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistAPI.updateTodolist(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeded'}))
            return {id: param.todolistId, title: param.title}

        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(setAppStatusAC({status: 'succeded'}))
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
        builder.addCase(fetchTodolistsThunk.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'All', entityStatus: "idle"}))
        })
        builder.addCase(removeTodolistThunk.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
            //2
            // return state.filter((tl) => tl.id !== action.payload.id)
        })
        builder.addCase(addTodolistThunk.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'All', entityStatus: "idle"})
        })
        builder.addCase(addTodolistThunk.rejected, (state, action)=>{
            alert(action.meta.arg.title)
        })
        builder.addCase(changeTodolistTitleThunk.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        })
    }
})

//reducer
export const TodolistsReducer = slice.reducer
export const {
    changeTodolistEntityStatusAC,
    changeFilterTodolist
    // setTodolistsAC,
    // addTodolistAC,
    // removeTodolistAC,
    // changeTitleTodolistAC,
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


//types
export type FilterValuesType = "All" | "Active" | "Completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: AppStatusType
}
export type TodolistTypeAC =
    | ReturnType<typeof changeFilterTodolist>
    | ReturnType<typeof changeTodolistEntityStatusAC>
//  | ReturnType<typeof removeTodolistAC>
//  | ReturnType<typeof addTodolistAC>
//  | ReturnType<typeof changeTitleTodolistAC>
//  | ReturnType<typeof setTodolistsAC>


