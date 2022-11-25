import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/tasks-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AppRootState} from "../../app/store";
import {todolistsActions} from './'

//state
const initialState: TaskStateType = {}

//thunk creator
const fetchTasksThunk = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
        const res = await taskAPI.getTasks(todolistId)
        thunkAPI.dispatch(setAppStatusAC({status: "succeded"}))
        return {todolistId, tasks: res.data.items}
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return {todolistId: '', tasks: []}
    } finally {
        thunkAPI.dispatch(setAppStatusAC({status: "succeded"}))
    }
})
const deleteTaskThunk = createAsyncThunk('tasks/deleteTaskThunk', async (param: { todolistId: string, taskId: string }, {dispatch, rejectWithValue}) => {
    try {
        dispatch(setAppStatusAC({status: "loading"}))
        const res = await taskAPI.deleteTask(param.todolistId, param.taskId)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeded"}))
            return {todolistId: param.todolistId, taskId: param.taskId}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(setAppStatusAC({status: "succeded"}))
    }
})
const addTaskThunk = createAsyncThunk('tasks/addTaskThunk', async (param: { todolistId: string, title: string },{dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await taskAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeded"}))
            return {task: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(setAppStatusAC({status: "succeded"}))
    }
})
const updateTaskThunk = createAsyncThunk('tasks/updateTaskThunk', async (param: { todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType }, {dispatch, rejectWithValue, getState}) => {
    const state = getState() as AppRootState
    let task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        // throw new Error("task is not found")
        return rejectWithValue("task is not found")
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
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await taskAPI.updateTask(param.todolistId, param.taskId, apiModel)
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: 'succeded'}))
            return param
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    } finally {

    }
})

export const asyncActions = {
    fetchTasksThunk,
    deleteTaskThunk,
    addTaskThunk,
    updateTaskThunk
}

//slice
const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(todolistsActions.addTodolistThunk.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(todolistsActions.removeTodolistThunk.fulfilled, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(todolistsActions.fetchTodolistsThunk.fulfilled, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTasksThunk.fulfilled, (state, action) => {
            if (action.payload)
                state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(deleteTaskThunk.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
            // state[action.payload.todolistId] = state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
        });
        builder.addCase(addTaskThunk.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            }

        });
        builder.addCase(updateTaskThunk.fulfilled, (state, action) => {
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
export const TasksReducer = slice.reducer

//types
export type UpdateDomainTaskModelType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string,
}
export type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}


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