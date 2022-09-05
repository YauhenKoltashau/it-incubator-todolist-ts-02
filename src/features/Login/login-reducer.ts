import {AppActionsType, AppThunk} from "../../app/store";
import {authAPI, LoginParamsType} from "../../api/auth-api";
import {AuthMeThunk} from "./auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";


export type LoginActionsType =
    | ReturnType<typeof setLoginedUserAC>
    | ReturnType<typeof setLogoutUserAC>


export type LoginStateType = {
    email: string | null
    password: string | null
    rememberMe: boolean
}

const initialState: LoginStateType = {
    email: null,
    password: null,
    rememberMe: false,
}

export const LoginReducer = (state: LoginStateType = initialState, action: AppActionsType): LoginStateType => {
    switch (action.type) {
        case "SET-LOGIN-USER":
            return {...state, email: action.params.email, password: action.params.password, rememberMe: action.params.rememberMe}

        default:
            return state
    }
}

export const setLoginedUserAC = (params: LoginParamsType) => ({
    type: 'SET-LOGIN-USER',
    params
} as const)
export const setLogoutUserAC = () => ({type: 'SET-LOGOUT-USER'}as const)

export const LoginThunk = (params: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    return authAPI.login(params)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setLoginedUserAC(params))
                dispatch(AuthMeThunk())
                dispatch(setAppStatusAC('succeded'))
            }else{
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const LogoutThunk = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    return authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0){
                dispatch(setLogoutUserAC())
                dispatch(AuthMeThunk())
                dispatch(setAppStatusAC('succeded'))
            }else{
                handleServerAppError(res.data,dispatch)
            }

        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

