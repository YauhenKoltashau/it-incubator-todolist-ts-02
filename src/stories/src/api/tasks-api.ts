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
        return  instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<ResponseType<TaskResponseType>>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return  instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

export type TaskType = {
    id: string
    title: string
    description: null | string
    todoListId: string,
    order: number,
    status: number,
    priority: number,
    startDate: null | string,
    deadline: null | string,
    addedDate: string,
}
export type TaskUpdateModelType = {
    id: string
    title: string
    description: null | string
    todoListId: string,
    priority: number,
}
type TaskResponseType = {
    item: TaskType[],
    totalCount: number,
    error: null | string
}

type CreateTaskResponseType = {
    data: TaskResponseType
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


export type ResponseType<T={}> = {
    data: T
    fieldsErrors: []
    messages: []
    resultCode: number

}





