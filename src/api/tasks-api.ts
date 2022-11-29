import axios from 'axios';
import {ResponseType, TaskResponseType, TaskType, UpdateTaskModelType} from "./types";

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
export const taskAPI = {
    updateTask(todolistId: string, taskId: string, model:UpdateTaskModelType ) {
        return  instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    getTasks(todolistId: string) {
        return instance.get<TaskResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return  instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}






