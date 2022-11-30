import {authAPI} from "../../api/auth-api";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ThunkError} from "../../utils/types";
import {AuthStateType} from "./loginTypes";

//new v
//state
const initialState: AuthStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}

//thunkCreator
const AuthMeThunk = createAsyncThunk<AuthStateType, {}, ThunkError>('auth/AuthMeThunk', async (param, thunkAPI) => {
    try {
        const res = await authAPI.authMe()
        if (res.data.resultCode === 0) {
            return {id: res.data.data.id, login: res.data.data.login, email: res.data.data.email, isAuth: true}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
            // return {id:null, login: null, email:null, isAuth: false}
        }
    } catch (err: any) {
        return handleAsyncServerNetworkError(err, thunkAPI)
    }
})
export const asyncActions = {
    AuthMeThunk
}

//slice
export const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AuthMeThunk.fulfilled, (state, action) => {
                state.id = action.payload.id;
                state.login = action.payload.login;
                state.email = action.payload.email;
                state.isAuth = action.payload.isAuth
            })
            .addCase(AuthMeThunk.rejected, (state, action) => {
                state.id = null;
                state.login = null;
                state.email = null;
                state.isAuth = false
            })
    }

})

//old v
//state
// const _initialState: _AuthStateType = {
//     id: null,
//     login: null,
//     email: null,
//     isAuth: false
// }
// //slice
// const _slice = createSlice({
//     name: 'auth',
//     initialState: initialState,
//     reducers: {
//         setAuthorizedUserAC (state, action: PayloadAction<AuthStateType>) {
//             state.id = action.payload.id; state.login = action.payload.login; state.email = action.payload.email; state.isAuth = action.payload.isAuth
//         }
//     },
//     extraReducers: (builder)=>{
//         builder.addCase(AuthMeThunk.fulfilled, (state, action)=>{
//             state.id = action.payload.id; state.login = action.payload.login; state.email = action.payload.email; state.isAuth = action.payload.isAuth
//         })
//     }
//
// })
// //reducer
// export const _AuthReducer = slice.reducer
// //thunks
// export const _AuthMeThunk = ():AppThunk => (dispatch) => {
//     return authAPI.authMe()
//         .then((res) => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setAuthorizedUserAC({id:res.data.data.id, login: res.data.data.login, email:res.data.data.email, isAuth: true}))
//             } else {
//                 dispatch(setAuthorizedUserAC({id: null, login: null, email: null, isAuth: false}))
//                 handleServerAppError(res.data, dispatch)
//             }
//         })
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }
// //actions
// export const {setAuthorizedUserAC} = _slice.actions
// //types
// export type AuthActionsType =
//     | ReturnType<typeof setAuthorizedUserAC>
// export type _AuthStateType = {
//     id: number | null
//     login: string | null
//     email: string | null
//     isAuth: boolean
// }