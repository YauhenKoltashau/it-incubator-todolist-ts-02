import axios from 'axios';

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

export const taskAPI = {
    updateTask(todolistId: string, taskId: string, title: string) {
        const promise = instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
        return promise
    },
    getTasks(todolistId: string) {
        const promise = instance.get<Array<TaskType>>(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, title: string) {
        const promise = instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
        return promise
    },
    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    }
}

export type TaskType = {
    id: string
    title: string
    description: boolean
}
type CreateTaskResponseType = {
    data: { item: TaskType }
    fieldsErrors: []
    messages: []
    resultCode: number
}
type UpdateTaskResponseType = {
    data: { item: TaskType }
    fieldsErrors: []
    messages: []
    resultCode: number
}
type DeleteTaskResponseType = {
    data: {}
    fieldsErrors: []
    messages: []
    resultCode: number
}


export type ResponseType<T> = {
    data: T
    fieldsErrors: []
    messages: []
    resultCode: number

}






