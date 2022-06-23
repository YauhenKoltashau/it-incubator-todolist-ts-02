import {TaskStateType} from "./AppWithRedux";
import {v1} from "uuid";
import {AddTodoAT, RemoveTodolistAT, todolistId_1, todolistId_2} from "./todolists-reducer";


export type TasksActionsType = RemoveTaskActionType | addTaskActionType| changedTitleTaskActionType | changedStatusTaskActionType | AddTodoAT | RemoveTodolistAT

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}
export type addTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}
export type changedTitleTaskActionType = {
    type: "CHANGE-TASK-TITLE"
    title:string
    taskId: string
    todolistId: string

}
export type changedStatusTaskActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone:boolean
    todolistId: string
}

const initialState: TaskStateType = {
    // [todolistId_1]: [
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "CSS", isDone: true},
    //     {id: v1(), title: "English A2", isDone: true},
    // ],
    // [todolistId_2]: [
    //     {id: v1(), title: "React", isDone: false},
    //     {id: v1(), title: "Angular", isDone: false},
    //     {id: v1(), title: "Backend", isDone: false},
    //     {id: v1(), title: "English B2", isDone: false}]
}

export const TasksReducer = (state:TaskStateType=initialState,action:TasksActionsType):TaskStateType => {
  switch (action.type) {
      case "REMOVE-TASK":
          return {...state,[action.todolistId]:state[action.todolistId].filter(t=>t.id!==action.taskId)}
      case "ADD-TASK":
          let newTask = {id: v1(), title: action.title, isDone: false}
          return {...state,[action.todolistId]: [newTask,...state[action.todolistId]]}
      case "CHANGE-TASK-TITLE":
          return {...state,[action.todolistId]:state[action.todolistId].map(t=>t.id===action.taskId?{...t,title:action.title}:t)}
      case "CHANGE-TASK-STATUS":
          return {...state,[action.todolistId]:state[action.todolistId].map(t=>t.id===action.taskId?{...t,isDone:action.isDone}:t)}
      case "ADD-TODOLIST":
          // const copyState = {...state}
          // copyState[action.todolistId] = []
          return {...state, [action.todolistId]: []}
      case "REMOVE-TODOLIST": {
          let copyState = {...state}
          delete copyState[action.id]
          return {...copyState}
      }


      default:
          return state

  }

}

export const removeTaskAC = (taskId: string,todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK',taskId,todolistId }
}
export const addTaskAC = (title: string, todolistId: string): addTaskActionType => {
    return { type: "ADD-TASK",title, todolistId}
}
export const changedTitleTaskAC = (title:string,taskId:string,todolistId: string): changedTitleTaskActionType => {
    return { type: "CHANGE-TASK-TITLE",title, taskId, todolistId}
}
export const changedStatusTaskAC = (taskId:string, isDone:boolean,todolistId:string): changedStatusTaskActionType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}


