import { setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/tasks-api";
import {AppDispatch} from "../app/store";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: AppDispatch) => {
    if(data.messages.length){
        dispatch(setAppErrorAC({error: data.messages[0]}))
        dispatch(setAppStatusAC({status: "failed"}))
    }else{
        dispatch(setAppErrorAC({error: 'some app error!'}))
        dispatch(setAppStatusAC({status: "failed"}))
    }
}
export const handleServerNetworkError = (error:any,dispatch:AppDispatch) => {
    dispatch(setAppErrorAC(error.message ? {error: error.message}: {error:"some network error"}))
    dispatch(setAppStatusAC({status: "failed"}))
}