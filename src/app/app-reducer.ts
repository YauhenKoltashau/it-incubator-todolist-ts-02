import {AppThunk} from "./store";
import {AuthMeThunk} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//state
const initialState: InitialStateType = {
    isInitialized: false,
    status: 'idle',
    error: null
}
//slice
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action:PayloadAction<{status:AppStatusType}>){
            state.status = action.payload.status
        },
        setAppErrorAC(state, action:PayloadAction<{error: string | null}>){
            state.error = action.payload.error
        },
        setCurrentInitializeAC(state, action:PayloadAction<{value: boolean}>){
            state.isInitialized =  action.payload.value
        }
    }
})

//reducer
export const AppReducer =slice.reducer
export const {setAppStatusAC, setAppErrorAC, setCurrentInitializeAC} = slice.actions

//thunks
export const initializeAppThunk = ():AppThunk => (dispatch) => {
    let promise = dispatch(AuthMeThunk())
    Promise.all([promise]).then(() => {
        dispatch(setCurrentInitializeAC({value: true}))})
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
//types
export type AppReducerActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setCurrentInitializeAC>

export type AppStatusType = 'idle' | 'loading' | 'succeded' | 'failed'
export type InitialStateType = {
    isInitialized: boolean
    status: AppStatusType
    error: string | null
}