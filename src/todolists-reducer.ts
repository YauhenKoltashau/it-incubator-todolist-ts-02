import {v1} from "uuid";
import {todolistAPI, TodolistType} from "./stories/src/api/todolist-api";
import {AppActionsType, AppThunk} from "./stories/src/app/store";

export type TodolistTypeAC =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTitleTodolistAC>
    | ReturnType<typeof changeFilterTodolistAC>
    | ReturnType<typeof setTodolistsAC>

export let todolistId_1 = v1()
export let todolistId_2 = v1()

let initialState1: Array<TodolistDomainType> = []

// .then((res)=>{[...initialState,res.data]})
export const TodolistsReducer = (state: Array<TodolistDomainType> = initialState1, action: AppActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter((tl) => tl.id !== action.id)
        case "ADD-TODOLIST":
            let newState: TodolistDomainType = {
                id: action.todolistId,
                addedDate: '5478488923',
                order: 0,
                title: action.title,
                filter: 'All'
            }
            return [newState, ...state]
        case "CHANGE-TODOLIST-TITLE":
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        case "CHANGE-TODOLIST-FILTER":
            return state.map((tl) => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "SET-TODOLISTS": {
            return action.todolists.map((tl) => ({...tl, filter: 'All'}))
        }

        default:
            return state

    }

}

export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (title: string) => ({type: "ADD-TODOLIST", todolistId: v1(), title} as const)
export const changeTitleTodolistAC = (title: string, id: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    id: id,
    title: title
} as const)
export const changeFilterTodolistAC = (filter: FilterValuesType, id: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter
} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists: todolists} as const)
// export const updateTaskAC = (taskId: string, model: UpdateTaskModelType, todolistId: string)=>({type: 'UPDATE-TASK', model, todolistId, taskId}as const)

export type FilterValuesType = "All" | "Active" | "Completed"

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const fetchTodolistsThunk = (): AppThunk => (dispatch) => {
    return todolistAPI.getTodolist()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))

        })
}



