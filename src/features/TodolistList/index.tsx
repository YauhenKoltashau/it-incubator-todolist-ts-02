import {asyncActions as tasksAsyncActions} from './tasks-reducer'
import {asyncActions as todolistsAsyncActions} from './todolists-reducer'
import {slice} from './todolists-reducer'
import {TodolistList} from './todolistList'

const todolistsActions = {
    ...todolistsAsyncActions,
    ...slice.actions
}
const tasksActions = {
    ...tasksAsyncActions,
    ...slice.actions
}
export {
    tasksActions,
    todolistsActions,
    TodolistList
}