import {AppActionsType, AppThunk} from "./store";
import {AuthMeThunk, setAuthorizedUserAC} from "../features/Auth/auth-reducer";
import {authAPI} from "../api/auth-api";

export type AppStatusType = 'idle' | 'loading' | 'succeded' | 'failed'
export type InitialStateType = {
    isInitialized: boolean
    status: AppStatusType
    error: string | null
}

const initialState: InitialStateType = {
    isInitialized: false,
    status: 'idle',
    error: null
}

export const AppReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET STATUS':
            return {...state, status: action.status}
        case 'APP/SET ERROR':
            return {...state, error: action.error}
        case "APP/SET INITIALIZE":
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}
export type AppReducerActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof checkCurrentInitializeAC>

export const setAppStatusAC = (status: AppStatusType) => ({type: 'APP/SET STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET ERROR', error} as const)
export const checkCurrentInitializeAC = (value: boolean) => ({type: 'APP/SET INITIALIZE', value} as const)

export const initializeAppThunk = (): AppThunk => (dispatch) => {
    let promise = dispatch(AuthMeThunk())
    Promise.all([promise]).then(() => {
        dispatch(checkCurrentInitializeAC(true))})
    // authAPI.authMe()
    //     .then((res) => {
    //         if (res.data.resultCode === 0) {
    //             dispatch(setAuthorizedUserAC(res.data.data.id, res.data.data.login, res.data.data.email, true))
    //         } else {
    //
    //         }
    //         dispatch(checkCurrentInitializeAC(true))
    //         // let promise = dispatch(AuthMeThunk())
    //         // Promise.all([promise]).then(() => {
    //         //     debugger
    //         //     dispatch(checkCurrentInitializeAC(true))})
    //     })
}