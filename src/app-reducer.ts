import {AppActionsType} from "./stories/src/app/store";
export type AppStatusType = 'idle'| 'loading' | 'succeded' | 'failed'
export type InitialStateType = {
    status: AppStatusType
    error: string | null
}

const initialState:InitialStateType = {
    status: 'idle',
    error: null
}

export const AppReducer = (state: InitialStateType=initialState, action: AppActionsType):InitialStateType => {
    switch (action.type) {
        case 'APP/SET STATUS':
            return {...state,status:action.status}
        case 'APP/SET ERROR':
            return {...state,error:action.error}
        default:
            return {...state}
    }
}
export type AppReducerActionsType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>
export const setAppStatusAC =(status: AppStatusType)=>({type:'APP/SET STATUS', status} as const)
export const setAppErrorAC =(error: string | null)=>({type:'APP/SET ERROR', error} as const)