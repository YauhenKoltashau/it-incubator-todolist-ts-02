import {appActions} from "../app";
import {AxiosError} from "axios";
import {ResponseType} from "../api/types";
import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {AuthStateType} from "../features/Login/auth-reducer";

// const {setAppStatusAC, setAppErrorAC} = appActions
// 1v
// export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: any, showError = true) => {
//     if (showError) {
//         dispatch(setAppErrorAC(data.messages.length ? {error: data.messages[0]} : {error: 'some app error!'}))
//     }
//     dispatch(setAppStatusAC({status: "failed"}))
// }
// export const handleServerNetworkError = (error: any, dispatch: any, showError = true) => {
//     if (showError) {
//         dispatch(setAppErrorAC(error.message ? {error: error.message} : {error: "some network error"}))
//     }
//     dispatch(setAppStatusAC({status: "failed"}))
// }

//2v
export const handleAsyncServerAppError = <D>(data: ResponseType<D>, thunkAPI: any, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppErrorAC(data.messages.length ? {error: data.messages[0]} : {error: 'some app error!'}))
    }
    thunkAPI.dispatch(setAppStatusAC({status: "failed"}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

export const handleAsyncServerNetworkError = (error: AxiosError, thunkAPI: any, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppErrorAC(error.message ? {error: error.message} : {error: "some network error"}))
    }
    thunkAPI.dispatch(setAppStatusAC({status: "failed"}))
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}