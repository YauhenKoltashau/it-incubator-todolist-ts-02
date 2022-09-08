import {AppThunk} from "../../app/store";
import {authAPI, LoginParamsType} from "../../api/auth-api";
import {AuthMeThunk} from "./auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//state
const initialState:LoginStateType = {
    email: null,
    password: null,
    rememberMe: false,
}
//slice
const slice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setLoginedUserAC(state, action: PayloadAction<LoginStateType>) {
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.rememberMe = action.payload.rememberMe
        }
    }
})
//reducer
export const LoginReducer = slice.reducer
export const {setLoginedUserAC} = slice.actions
//thunks
export const LoginThunk = (params: LoginParamsType):AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    return authAPI.login(params)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setLoginedUserAC(params))
                dispatch(AuthMeThunk())
                dispatch(setAppStatusAC({status: 'succeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const LogoutThunk = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    return authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                // dispatch(setLogoutUserAC())
                dispatch(AuthMeThunk())
                dispatch(setAppStatusAC({status: 'succeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
//types


export type LoginActionsType =
    | ReturnType<typeof setLoginedUserAC>

export type LoginStateType = {
        email: string | null
        password: string | null
        rememberMe: boolean
}


