import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/tasks-api";
import {AppRootState, AppThunk} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//state
const initialState: TaskStateType = {}

//slice
const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTaskAC(state, action: PayloadAction<{ todolistId: string, tasks: Array<TaskType> }>) {
            state[action.payload.todolistId] = action.payload.tasks
            // return state[action.payload.todolistId] = action.payload.tasks
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
            state[action.payload.todolistId] = state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
        },
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.domainModel}
            }
            state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.domainModel} : t)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addTodolistAC,(state, action)=>{
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolistAC,(state,action)=>{
            delete state[action.payload.id]
        });
        builder.addCase(setTodolistsAC,(state, action)=>{
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        });

    }
})

//reducer
export const TasksReducer = slice.reducer
export const {
    setTaskAC,
    addTaskAC,
    removeTaskAC,
    updateTaskAC,
} = slice.actions

//thunks
export const fetchTasksThunk = (todolistId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC({status: "loading"}))
        const res = await taskAPI.getTasks(todolistId)
        dispatch(setTaskAC({todolistId, tasks: res.data.items}))
        dispatch(setAppStatusAC({status: "succeded"}))
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppStatusAC({status: "succeded"}))
    }
}
export const deleteTaskThunk = (todolistId: string, taskId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC({status: "loading"}))
        const res = await taskAPI.deleteTask(todolistId, taskId)
        if (res.data.resultCode === 0) {
            dispatch(removeTaskAC({taskId, todolistId}))
            dispatch(setAppStatusAC({status: "succeded"}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppStatusAC({status: "succeded"}))
    }
}
export const addTaskThunk = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await taskAPI.createTask(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC({task: res.data.data.item}))
            dispatch(setAppStatusAC({status: "succeded"}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppStatusAC({status: "succeded"}))
    }
}
export const updateTaskThunk = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => async (dispatch, getState: () => AppRootState) => {
    try {
        const state = getState()
        let task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            // throw new Error("task is not found")
            console.warn("task is not found")
            return
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        dispatch(setAppStatusAC({status: "loading"}))
        const res = await taskAPI.updateTask(todolistId, taskId, apiModel)
        if (res.data.resultCode === 0) {
            dispatch(updateTaskAC({todolistId, taskId, domainModel}))
            dispatch(setAppStatusAC({status: 'succeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {

    }
}

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
export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTaskAC>
    | ReturnType<typeof updateTaskAC>


