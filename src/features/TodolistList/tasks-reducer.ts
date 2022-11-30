import {taskAPI} from "../../api/tasks-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {handleAsyncServerAppError, handleAsyncServerNetworkError, handleLocalError} from "../../utils/error-utils";
import {todolistsActions, types} from './'
import {AppRootState, ThunkError} from "../../utils/types";
import {TaskType, UpdateTaskModelType} from "../../api/types";
import {activeAppStatusLoading, activeAppStatusSucceded} from "../../common/AppCommonActions";

//state
const initialState: types.TaskStateType = {}

//thunk creator
const fetchTasksThunk = createAsyncThunk<{ todolistId: string, tasks: TaskType[] }, { todolistId: string }, ThunkError>('tasks/fetchTasks', async ({todolistId: todolistId}, thunkAPI) => {
    const dispatch = thunkAPI.dispatch
    try {
        activeAppStatusLoading(dispatch)
        const res = await taskAPI.getTasks(todolistId)
        activeAppStatusSucceded(dispatch)
        return {todolistId, tasks: res.data.items}
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, thunkAPI)
    } finally {
        activeAppStatusSucceded(dispatch)
    }
})
const deleteTaskThunk = createAsyncThunk<{ todolistId: string, taskId: string }, { todolistId: string, taskId: string }, ThunkError>('tasks/deleteTaskThunk', async (param: { todolistId: string, taskId: string }, thunkAPI) => {
    const dispatch = thunkAPI.dispatch
    try {
        activeAppStatusLoading(dispatch)
        const res = await taskAPI.deleteTask(param.todolistId, param.taskId)
        if (res.data.resultCode === 0) {
            activeAppStatusSucceded(dispatch)
            return {todolistId: param.todolistId, taskId: param.taskId}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, thunkAPI)
    } finally {
        activeAppStatusSucceded(dispatch)
    }
})
const addTaskThunk = createAsyncThunk<{ task: TaskType }, { todolistId: string, title: string }, ThunkError>('tasks/addTaskThunk', async (param, thunkAPI) => {
    const dispatch = thunkAPI.dispatch
    activeAppStatusLoading(dispatch)
    try {
        const res = await taskAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            activeAppStatusSucceded(dispatch)
            return {task: res.data.data.item}
        } else {
            handleAsyncServerAppError(res.data, thunkAPI, false)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, thunkAPI)
    } finally {
        activeAppStatusSucceded(dispatch)
    }
})
const updateTaskThunk = createAsyncThunk<{ todolistId: string, taskId: string, domainModel: types.UpdateDomainTaskModelType },
    { todolistId: string, taskId: string, domainModel: types.UpdateDomainTaskModelType },
    ThunkError>('tasks/updateTaskThunk', async (param, thunkAPI) => {
    const state = thunkAPI.getState() as AppRootState
    let task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        // throw new Error("task is not found")
        return handleLocalError("task is not found", thunkAPI,)
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...param.domainModel
    }
    const dispatch = thunkAPI.dispatch
    activeAppStatusLoading(dispatch)
    try {
        const res = await taskAPI.updateTask(param.todolistId, param.taskId, apiModel)
        if (res.data.resultCode === 0) {
            activeAppStatusSucceded(dispatch)
            return param
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, thunkAPI)
    } finally {
        activeAppStatusSucceded(dispatch)
    }
})

export const asyncActions = {
    fetchTasksThunk,
    deleteTaskThunk,
    addTaskThunk,
    updateTaskThunk
}

//slice
export const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(todolistsActions.addTodolistThunk.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsActions.removeTodolistThunk.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(todolistsActions.fetchTodolistsThunk.fulfilled, (state, action) => {
                action.payload.todolists.forEach(tl => {
                    state[tl.id] = []
                })
            })
            .addCase(fetchTasksThunk.fulfilled, (state, action) => {
                if (action.payload)
                    state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(deleteTaskThunk.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index > -1) {
                    tasks.splice(index, 1)
                    // state[action.payload.todolistId] = state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
                }
            })
            .addCase(addTaskThunk.fulfilled, (state, action) => {
                if (action.payload) {
                    state[action.payload.task.todoListId].unshift(action.payload.task)
                }

            })
            .addCase(updateTaskThunk.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel}
                }
                state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.domainModel} : t)
            })
    }
})

//reducer

//types



//old
//slice
// export const _slice = createSlice({
//     name: 'tasks',
//     initialState: {} as TaskStateType,
//     reducers: {
//         _setTaskAC(state, action: PayloadAction<{ todolistId: string, tasks: Array<TaskType> }>) {
//             state[action.payload.todolistId] = action.payload.tasks
//             // return state[action.payload.todolistId] = action.payload.tasks
//         },
//         _removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
//             const tasks = state[action.payload.todolistId];
//             const index = tasks.findIndex(t => t.id === action.payload.taskId)
//             if (index > -1) {
//                 tasks.splice(index, 1)
//             }
//             state[action.payload.todolistId] = state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
//         },
//         _addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
//             state[action.payload.task.todoListId].unshift(action.payload.task)
//         },
//
//         _updateTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType }>) {
//             const tasks = state[action.payload.todolistId];
//             const index = tasks.findIndex(t => t.id === action.payload.taskId)
//             if (index > -1) {
//                 tasks[index] = {...tasks[index], ...action.payload.domainModel}
//             }
//             state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.domainModel} : t)
//         }
//     },
//     extraReducers: (builder) => {
//         builder.addCase(addTodolistAC, (state, action) => {
//             state[action.payload.todolist.id] = [];
//         });
//         builder.addCase(removeTodolistAC, (state, action) => {
//             delete state[action.payload.id]
//         });
//         builder.addCase(setTodolistsAC, (state, action) => {
//             action.payload.todolists.forEach(tl => {
//                 state[tl.id] = []
//             })
//         });
//     }
// })
// //reducer
// export const _TasksReducer = slice.reducer
// //action
// export const {
//     _addTaskAC,
//     _updateTaskAC,
//     _removeTaskAC,
//     _setTaskAC
// } = _slice.actions
//
// //types
// export type TasksActionsType =
//     | ReturnType<typeof _removeTaskAC>
//     | ReturnType<typeof _addTaskAC>
//     | ReturnType<typeof addTodolistAC>
//     | ReturnType<typeof removeTodolistAC>
//     | ReturnType<typeof setTodolistsAC>
//     | ReturnType<typeof _setTaskAC>
//     | ReturnType<typeof _updateTaskAC>
//
// export const _addTaskThunk = (todolistId: string, title: string): AppThunk => async (dispatch) => {
//     try {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         const res = await taskAPI.createTask(todolistId, title)
//         if (res.data.resultCode === 0) {
//             dispatch(_addTaskAC({task: res.data.data.item}))
//             dispatch(setAppStatusAC({status: "succeded"}))
//         } else {
//             handleServerAppError(res.data, dispatch)
//         }
//     } catch (error) {
//         handleServerNetworkError(error, dispatch)
//     } finally {
//         dispatch(setAppStatusAC({status: "succeded"}))
//     }
// }
// export const _updateTaskThunk = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => async (dispatch, getState: () => AppRootState) => {
//     try {
//         const state = getState()
//         let task = state.tasks[todolistId].find(t => t.id === taskId)
//         if (!task) {
//             // throw new Error("task is not found")
//             console.warn("task is not found")
//             return
//         }
//         const apiModel: UpdateTaskModelType = {
//             title: task.title,
//             description: task.description,
//             status: task.status,
//             priority: task.priority,
//             startDate: task.startDate,
//             deadline: task.deadline,
//             ...domainModel
//         }
//         dispatch(setAppStatusAC({status: "loading"}))
//         const res = await taskAPI.updateTask(todolistId, taskId, apiModel)
//         if (res.data.resultCode === 0) {
//             dispatch(_updateTaskAC({todolistId, taskId, domainModel}))
//             dispatch(setAppStatusAC({status: 'succeded'}))
//         } else {
//             handleServerAppError(res.data, dispatch)
//         }
//     } catch (error) {
//         handleServerNetworkError(error, dispatch)
//     } finally {
//
//     }
// }