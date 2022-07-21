import {TaskStateType} from "./AppWithRedux";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./stories/src/api/tasks-api";
import {AppActionsType} from "./stories/src/app/store";


export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changedTitleTaskAC>
    | ReturnType<typeof changedStatusTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTaskAC>


const initialState: TaskStateType = {
}
export const TasksReducer = (state:TaskStateType=initialState,action:AppActionsType):TaskStateType => {
  switch (action.type) {
      case "REMOVE-TASK":
          return {...state,[action.todolistId]:state[action.todolistId].filter(t=>t.id!==action.taskId)}
      case "ADD-TASK":
          let newTask = {id: v1(), title: action.title, isDone: false,description: '',todoListId: '',order: 0, status: TaskStatuses.New, priority:TaskPriorities.Low,startDate:'', deadline:'', addedDate:''}
          return {...state,[action.todolistId]: [newTask,...state[action.todolistId]]}
      case "CHANGE-TASK-TITLE":
          return {...state,[action.todolistId]:state[action.todolistId].map(t=>t.id===action.taskId?{...t,title:action.title}:t)}
      case "CHANGE-TASK-STATUS":
          return {...state,[action.todolistId]:state[action.todolistId].map(t=>t.id===action.taskId?{...t,status:action.status}:t)}
      case "ADD-TODOLIST":
          // const copyState = {...state}
          // copyState[action.todolistId] = []
          return {...state, [action.todolistId]: []}
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
          let copyState ={...state}

          return copyState
      default:
          return state
  }
}

export const removeTaskAC = (taskId: string,todolistId: string) => ({ type: 'REMOVE-TASK',taskId,todolistId }as const)
export const addTaskAC = (title: string, todolistId: string) => ({ type: "ADD-TASK",title, todolistId} as const)
export const changedTitleTaskAC = (title:string,taskId:string,todolistId: string) => ({ type: "CHANGE-TASK-TITLE",title, taskId, todolistId} as const)
export const changedStatusTaskAC = (taskId:string, status:TaskStatuses,todolistId:string) => ({ type: 'CHANGE-TASK-STATUS', taskId, status, todolistId} as const)
export const setTaskAC = (todolistId:string) => ({ type: 'SET-TASK', todolistId} as const)



