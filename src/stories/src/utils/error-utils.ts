import { setAppErrorAC, setAppStatusAC} from "../../../app-reducer";
import {ResponseType} from "../api/tasks-api";
import {AppDispatch} from "../app/store";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: AppDispatch) => {
    if(data.messages.length){
        dispatch(setAppErrorAC(data.messages[0]))
        dispatch(setAppStatusAC("failed"))
    }else{
        dispatch(setAppErrorAC('some app error!'))
        dispatch(setAppStatusAC("failed"))
    }
}
export const handleServerNetworkError = (error:any,dispatch:AppDispatch) => {
    dispatch(setAppErrorAC(error.message ? error.message: "some network error"))
    dispatch(setAppStatusAC("failed"))
}