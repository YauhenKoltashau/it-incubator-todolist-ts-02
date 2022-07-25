import {AppActionsType, AppThunk} from "../../app/store";
import {authAPI} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export type AuthActionsType =
    | ReturnType<typeof setAuthorizedUserAC>

export type AuthStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

const initialState: AuthStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}
export const AuthReducer = (state: AuthStateType = initialState, action: AppActionsType): AuthStateType => {
    switch (action.type) {
        case "SET-AUTHORIZED-USER":
            return {...state, id: action.id, login: action.login, email: action.email, isAuth: action.isAuth}

        default:
            return state
    }
}

export const setAuthorizedUserAC = (id: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
    type: "SET-AUTHORIZED-USER",
    id,
    login,
    email,
    isAuth
} as const)

export const AuthMeThunk = (): AppThunk => (dispatch) => {
    return authAPI.authMe()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthorizedUserAC(res.data.data.id, res.data.data.login, res.data.data.email, true))
            } else {
                dispatch(setAuthorizedUserAC(null, null, null, false))
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
