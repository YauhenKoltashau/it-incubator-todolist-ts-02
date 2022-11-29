import {asyncActions as tasksAsyncActions} from './tasks-reducer'
import {asyncActions as todolistsAsyncActions} from './todolists-reducer'
import {slice as todosSlice} from './todolists-reducer'
import {slice as tasksSlice} from './tasks-reducer'
import {TodolistList} from './todolistList'

//reducer
const todolistsReducer = todosSlice.reducer
const tasksReducer = tasksSlice.reducer
//actions
const todolistsActions = {
    ...todolistsAsyncActions,
    ...todosSlice.actions
}
const tasksActions = {
    ...tasksAsyncActions,
    ...tasksSlice.actions
}
//export
export {
    TodolistList,
    tasksActions,
    todolistsActions,
    todolistsReducer,
    tasksReducer
}