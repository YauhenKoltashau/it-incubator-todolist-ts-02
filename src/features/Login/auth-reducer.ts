import {AppThunk} from "../../app/store";
import {authAPI} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: AuthStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}
const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setAuthorizedUserAC (state, action: PayloadAction<AuthStateType>) {
             state.id = action.payload.id; state.login = action.payload.login; state.email = action.payload.email; state.isAuth = action.payload.isAuth
        }
    }
})
export const AuthReducer = slice.reducer
export const {setAuthorizedUserAC} = slice.actions


export const AuthMeThunk = ():AppThunk => (dispatch) => {
    return authAPI.authMe()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthorizedUserAC({id:res.data.data.id, login: res.data.data.login, email:res.data.data.email, isAuth: true}))
            } else {
                dispatch(setAuthorizedUserAC({id: null, login: null, email: null, isAuth: false}))
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
//types
export type AuthActionsType =
    | ReturnType<typeof setAuthorizedUserAC>

export type AuthStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}