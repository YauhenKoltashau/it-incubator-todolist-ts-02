//auth-api types
export type FieldErrorType = { field: string; error: string }
export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<FieldErrorType>
    data: D
}
//todos-api types
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
//tasks-api types
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    id: string
    title: string
    description: null | string
    todoListId: string,
    order: number,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: null | string,
    deadline: null | string,
    addedDate: string,
}
export type UpdateTaskModelType = {
    title: string,
    description: null | string,
    status: number,
    priority: number,
    startDate: null | string,
    deadline: null | string,
}
export type TaskResponseType = {
    items: TaskType[],
    totalCount: number,
    error: null | string
}