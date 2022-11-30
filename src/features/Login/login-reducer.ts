import {authAPI, LoginParamsType} from "../../api/auth-api";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ThunkError} from "../../utils/types";
import {activeAppStatusLoading, activeAppStatusSucceded} from "../../common/AppCommonActions";
import {loginActions} from "./index";
import {LoginStateType} from "./loginTypes";
//  new v
//state
const initialState: LoginStateType = {
    email: null,
    password: null,
    rememberMe: false,
}
// thunk creators
export const LoginThunk = createAsyncThunk<{ param: LoginParamsType }, LoginParamsType,
    ThunkError>('login/LoginThunk', async (param: LoginParamsType, thunkAPI) => {
    const dispatch = thunkAPI.dispatch
    activeAppStatusLoading(dispatch)
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            dispatch(loginActions.AuthMeThunk({}))
            activeAppStatusSucceded(dispatch)
            return {param}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI)

    }
})
export const LogoutThunk = createAsyncThunk('login/LogoutThunk', async (param: {}, thunkAPI) => {
    const dispatch = thunkAPI.dispatch
    activeAppStatusLoading(dispatch)
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            // dispatch(setLogoutUserAC())
            dispatch(loginActions.AuthMeThunk({}))
            activeAppStatusSucceded(dispatch)
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkError(error, thunkAPI)
    }
})
export const asyncActions = {
    LoginThunk,
    LogoutThunk
}
//slice
export const slice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(LoginThunk.fulfilled, (state, action) => {
                state.email = action.payload.param.email;
                state.password = action.payload.param.password;
                state.rememberMe = action.payload.param.rememberMe
            })
    }
})
//reducer
export const LoginReducer = slice.reducer

//old v
// const _initialState: LoginStateType = {
//     email: null,
//     password: null,
//     rememberMe: false,
// }
// const _slice = createSlice({
//     name: 'login',
//     initialState: _initialState,
//     reducers: {
//         setLoginedUserAC(state, action: PayloadAction<LoginStateType>) {
//             state.email = action.payload.email;
//             state.password = action.payload.password;
//             state.rememberMe = action.payload.rememberMe
//         }
//     },
// })
// export const LoginReducer = _slice.reducer
// export const {setLoginedUserAC} = _slice.actions
// export const LoginThunk = (param: LoginParamsType): AppThunk => async (dispatch) => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     try {
//         const res = await authAPI.login(param)
//         if (res.data.resultCode === 0) {
//             dispatch(AuthMeThunk({}))
//             dispatch(setAppStatusAC({status: 'succeded'}))
//             dispatch(setLoginedUserAC({email: param.email, password: param.password, rememberMe:true}))
//         } else {
//             handleServerAppError(res.data, dispatch)
//         }
//     } catch (error) {
//         handleServerNetworkError(error, dispatch)
//     }
// }
// export const LogoutThunk = (): AppThunk => async (dispatch) => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     try {
//         const res = await authAPI.logout()
//         if (res.data.resultCode === 0) {
//             // dispatch(setLogoutUserAC())
//             dispatch(AuthMeThunk({}))
//             dispatch(setAppStatusAC({status: 'succeded'}))
//         } else {
//             handleServerAppError(res.data, dispatch)
//         }
//     } catch (error) {
//         handleServerNetworkError(error, dispatch)
//     }
// }
// export type LoginActionsType =
//     | ReturnType<typeof setLoginedUserAC>
// export type LoginStateType = {
//     email: string | null
//     password: string | null
//     rememberMe: boolean
// }