import {TaskStateType} from "./AppWithRedux";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "./stories/src/api/tasks-api";
import {AppActionsType, AppRootState, AppThunk} from "./stories/src/app/store";
import {todolistAPI} from "./stories/src/api/todolist-api";


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


const initialState: TaskStateType = {
}
export const TasksReducer = (state:TaskStateType=initialState,action:AppActionsType):TaskStateType => {
  switch (action.type) {
      case "REMOVE-TASK":
          return {...state,[action.todolistId]:state[action.todolistId].filter(t=>t.id!==action.taskId)}
      case "ADD-TASK":
          let newTask = action.task
          return {...state,[action.task.todoListId]: [newTask,...state[action.task.todoListId]]}
      case "CHANGE-TASK-TITLE":
          return {...state,[action.todolistId]:state[action.todolistId].map(t=>t.id===action.taskId?{...t,title:action.title}:t)}
      case "CHANGE-TASK-STATUS":
          return {...state,[action.todolistId]:state[action.todolistId].map(t=>t.id===action.taskId?{...t,status:action.status}:t)}
      case "UPDATE-TASK":
          return {...state,[action.todolistId]:state[action.todolistId].map(t=>t.id===action.taskId?{...t,...action.domainModel}:t)}
      case "ADD-TODOLIST":
          // const copyState = {...state}
          // copyState[action.todolistId] = []
          return {...state, [action.todolist.id]: []}
      case "REMOVE-TODOLIST": {
          let copyState = {...state}
          delete copyState[action.id]
          return {...copyState}
      }
      case "SET-TODOLISTS":{
          let copyState ={...state}
          action.todolists.forEach(tl=>{
              copyState[tl.id]=[]
          })
          return copyState
      }
      case "SET-TASK":
          // let copyState ={...state}
          // copyState[action.todolistId] = action.tasks
          return {...state,[action.todolistId]:action.tasks}
      default:
          return state
  }
}

export const removeTaskAC = (taskId: string,todolistId: string) => ({ type: 'REMOVE-TASK',taskId,todolistId }as const)
export const addTaskAC = ( task:TaskType) => ({ type: "ADD-TASK", task} as const)
export const changedTitleTaskAC = (title:string,taskId:string,todolistId: string) => ({ type: "CHANGE-TASK-TITLE",title, taskId, todolistId} as const)
export const changedStatusTaskAC = (todolistId:string, taskId:string, status:TaskStatuses) => ({ type: 'CHANGE-TASK-STATUS',todolistId, taskId, status } as const)
export const setTaskAC = (todolistId:string, tasks:Array<TaskType> ) => ({ type: 'SET-TASK', todolistId, tasks} as const)
export const updateTaskAC = (todolistId:string, taskId: string,domainModel:UpdateDomainTaskModelType  ) => ({ type: 'UPDATE-TASK', todolistId, taskId, domainModel } as const)

export const fetchTasksThunk =(todolistId: string):AppThunk => (dispatch) => {
    taskAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTaskAC(todolistId,res.data.items))
        })
}
export const deleteTaskThunk =(todolistId: string,taskId: string):AppThunk => (dispatch) => {
    taskAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            if(res.data.resultCode === 0){
                dispatch(removeTaskAC(taskId,todolistId))
            }

        })
}
export const addTaskThunk =(todolistId: string, title: string):AppThunk => (dispatch) => {
    taskAPI.createTask(todolistId, title)
        .then((res) => {
            if(res.data.resultCode === 0){
                dispatch(addTaskAC(res.data.data.item))
            }

        })
}
export const changeTitleTaskThunk =(todolistId: string, taskId: string, title: string):AppThunk => (dispatch,getState) => {
    const state = getState()
    let task = state.tasks[todolistId].find(t => t.id === taskId)
    if(!task){
        // throw new Error("task is not found")
        console.warn("task is not found")
        return
    }
    const model: UpdateTaskModelType = {
        title:title,
        description: task.description,
        status: task.status,
        priority:task.priority,
        startDate:task.startDate,
        deadline: task.deadline
    }
    taskAPI.updateTask(todolistId, taskId, model)
        .then((res) => {
            if(res.data.resultCode === 0){
                dispatch(changedTitleTaskAC(title, taskId, todolistId))
            }

        })
}
export const changeTaskStatusThunk =(todolistId: string, taskId: string, status: TaskStatuses):AppThunk => (dispatch,getState:()=>AppRootState) => {
   const state = getState()
    let task = state.tasks[todolistId].find(t => t.id === taskId)
    if(!task){
        // throw new Error("task is not found")
        console.warn("task is not found")
        return
    }
    const model: UpdateTaskModelType = {
        title:task.title,
        description: task.description,
        status: status,
        priority:task.priority,
        startDate:task.startDate,
        deadline: task.deadline
    }
    taskAPI.updateTask(todolistId, taskId, model)
        .then((res) => {
            if(res.data.resultCode === 0){
                dispatch(changedStatusTaskAC(todolistId, taskId, status))
            }

        })
}

export type UpdateDomainTaskModelType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string,
}
export const updateTaskThunk =(todolistId: string, taskId: string, domainModel:UpdateDomainTaskModelType):AppThunk => (dispatch,getState:()=>AppRootState) => {
   const state = getState()
    let task = state.tasks[todolistId].find(t => t.id === taskId)
    if(!task){
        // throw new Error("task is not found")
        console.warn("task is not found")
        return
    }
    const apiModel: UpdateTaskModelType = {
        title:task.title,
        description: task.description,
        status: task.status,
        priority:task.priority,
        startDate:task.startDate,
        deadline: task.deadline,
        ...domainModel
    }
    taskAPI.updateTask(todolistId, taskId, apiModel)
        .then((res) => {
            if(res.data.resultCode === 0){
                dispatch(updateTaskAC(todolistId, taskId, domainModel))
            }

        })
}

