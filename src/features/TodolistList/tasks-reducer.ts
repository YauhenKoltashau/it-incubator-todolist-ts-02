import {TaskStateType} from "../../app/AppWithRedux";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/tasks-api";
import {AppActionsType, AppRootState, AppThunk} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

//state
const initialState: TaskStateType = {}

//reducer
export const TasksReducer = (state: TaskStateType = initialState, action: AppActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "CHANGE-TASK-TITLE":
            return {...state,[action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t,title: action.title} : t)}
        case "CHANGE-TASK-STATUS":
            return {...state,[action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t,status: action.status} : t)}
        case "UPDATE-TASK":
            return {...state,[action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.domainModel} : t)}
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return {...copyState}
        }
        case "SET-TODOLISTS": {
            let copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASK":
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

//actions
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) => ({type: "ADD-TASK", task} as const)
export const changedTitleTaskAC = (title: string, taskId: string, todolistId: string) => ({
    type: "CHANGE-TASK-TITLE",
    title,
    taskId,
    todolistId
} as const)
export const changedStatusTaskAC = (todolistId: string, taskId: string, status: TaskStatuses) => ({
    type: 'CHANGE-TASK-STATUS',
    todolistId,
    taskId,
    status
} as const)
export const setTaskAC = (todolistId: string, tasks: Array<TaskType>) => ({
    type: 'SET-TASK',
    todolistId,
    tasks
} as const)
export const updateTaskAC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => ({
    type: 'UPDATE-TASK',
    todolistId,
    taskId,
    domainModel
} as const)

//thunks
export const fetchTasksThunk = (todolistId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"))
        const res = await taskAPI.getTasks(todolistId)
        dispatch(setTaskAC(todolistId, res.data.items))
        dispatch(setAppStatusAC("succeded"))
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppStatusAC("succeded"))
    }
}
export const deleteTaskThunk = (todolistId: string, taskId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"))
        const res = await taskAPI.deleteTask(todolistId, taskId)
        if (res.data.resultCode === 0) {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC("succeded"))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppStatusAC("succeded"))
    }
}
export const addTaskThunk = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await taskAPI.createTask(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setAppStatusAC("succeded"))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppStatusAC("succeded"))
    }
}
export const changeTitleTaskThunk = (todolistId: string, taskId: string, title: string): AppThunk => async (dispatch, getState) => {
    try {
        const state = getState()
        let task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            // throw new Error("task is not found")
            console.warn("task is not found")
            return
        }
        const model: UpdateTaskModelType = {
            title: title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }
        const res = await taskAPI.updateTask(todolistId, taskId, model)
        if (res.data.resultCode === 0) {
            dispatch(changedTitleTaskAC(title, taskId, todolistId))
        } else {
            handleServerAppError(res.data, dispatch)
        }

    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {

    }
}
export const changeTaskStatusThunk = (todolistId: string, taskId: string, status: TaskStatuses): AppThunk => async (dispatch, getState: () => AppRootState) => {
    try {
        const state = getState()
        let task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            // throw new Error("task is not found")
            console.warn("task is not found")
            return
        }
        const model: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }
        const res = await taskAPI.updateTask(todolistId, taskId, model)
        if (res.data.resultCode === 0) {
            dispatch(changedStatusTaskAC(todolistId, taskId, status))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {

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
        dispatch(setAppStatusAC("loading"))
        const res = await taskAPI.updateTask(todolistId, taskId, apiModel)
        if (res.data.resultCode === 0) {
            dispatch(updateTaskAC(todolistId, taskId, domainModel))
            dispatch(setAppStatusAC('succeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
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
export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changedTitleTaskAC>
    | ReturnType<typeof changedStatusTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTaskAC>
    | ReturnType<typeof updateTaskAC>


