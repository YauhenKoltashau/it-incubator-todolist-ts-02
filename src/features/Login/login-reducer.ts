import {authAPI, FieldErrorType, LoginParamsType} from "../../api/auth-api";
import {AuthMeThunk} from "./auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {setAppStatusAC} from "../../app/app-reducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
                                    //  new v
//state
const initialState: LoginStateType = {
    email: null,
    password: null,
    rememberMe: false,
}
// thunk creators
export const LoginThunk = createAsyncThunk<{ param: LoginParamsType }, LoginParamsType ,{rejectValue:{errors: string[], fieldsErrors?: Array<FieldErrorType>}}>('login/LoginThunk', async (param: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(AuthMeThunk({}))
            thunkAPI.dispatch(setAppStatusAC({status: 'succeded'}))
            return {param}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors:[error], fieldsErrors: undefined})

    }
})
export const LogoutThunk = createAsyncThunk('login/LogoutThunk', async (param: {}, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            // dispatch(setLogoutUserAC())
            thunkAPI.dispatch(AuthMeThunk({}))
            thunkAPI.dispatch(setAppStatusAC({status: 'succeded'}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
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
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(LoginThunk.fulfilled, (state, action) => {
            state.email = action.payload.param.email;
            state.password = action.payload.param.password;
            state.rememberMe = action.payload.param.rememberMe
        })
    }
})
//reducer
export const LoginReducer = slice.reducer
//types
export type LoginStateType = {
    email: string | null
    password: string | null
    rememberMe: boolean
}

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