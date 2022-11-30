//types
import {TaskPriorities, TaskStatuses, TaskType, TodolistType} from "../../api/types";
import {AppStatusType} from "../../app/appTypes";
import {todolistsActions} from "./index";

// todos types
export type FilterValuesType = "All" | "Active" | "Completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: AppStatusType
}
export type TodolistTypeAC =
    | ReturnType<typeof todolistsActions.changeFilterTodolist>
    | ReturnType<typeof todolistsActions.changeTodolistEntityStatusAC>
//tasks types
export type UpdateDomainTaskModelType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string,
}
export type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}