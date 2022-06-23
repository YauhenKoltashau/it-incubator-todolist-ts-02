import {FilterValuesType, TodolistType} from "./AppWithRedux";
import {v1} from "uuid";

export type TodolistTypeAC = RemoveTodolistAT|AddTodoAT|ChangeTodolistTitleAT|ChangeFilterTodolistAT
export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoAT = {
    type: "ADD-TODOLIST"
    todolistId: string
    title: string
}
export type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    id: string

}
export type ChangeFilterTodolistAT = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    id: string

}

export let todolistId_1 = v1()
export let todolistId_2 = v1()

const initialState: Array<TodolistType> = [
    // {id: todolistId_1, title: 'What to almost learn', filter: 'All'},
    // {id: todolistId_2, title: 'What to want to learn', filter: 'All'}
]

export const TodolistsReducer = (state:Array<TodolistType>=initialState,action:TodolistTypeAC):Array<TodolistType> => {
  switch (action.type) {
      case "REMOVE-TODOLIST":
          return state.filter((tl) => tl.id !== action.id)
      case "ADD-TODOLIST":
          let newState: TodolistType = {id: action.todolistId, title: action.title, filter: 'All'}
          return [newState,...state]
      case "CHANGE-TODOLIST-TITLE":
          let todolist = state.find(tl => tl.id === action.id)
          if (todolist) {
              todolist.title = action.title
          }
          return [...state]
      case "CHANGE-TODOLIST-FILTER":
          return state.map((tl) => tl.id === action.id ? {...tl, filter: action.filter} : tl)

      default:
          return state

  }

}

export const removeTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title:string): AddTodoAT => {

    return { type: "ADD-TODOLIST", todolistId:v1(), title}
}
export const changeTitleTodolistAC = (title:string,id:string): ChangeTodolistTitleAT => {
    return { type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
export const changeFilterTodolistAC = (filter:FilterValuesType, id:string): ChangeFilterTodolistAT => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}


