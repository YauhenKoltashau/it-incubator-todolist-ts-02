import axios from 'axios';
import {ResponseType, TodolistType} from "./types";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '26ffa3e6-cad0-4cf9-8170-904cae9d9ac2'
    }

}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

//api
export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title})
        return promise
    },
    getTodolists(){
        const promise = instance.get<TodolistType[]>('todo-lists')
        return promise
    },
    createTodolist(title:string){
        const promise = instance.post<ResponseType<{item:TodolistType}>>('todo-lists', {title})
            return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
        return promise
    }
}






