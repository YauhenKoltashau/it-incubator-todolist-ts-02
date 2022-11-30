import {asyncActions, slice} from "./app-reducer"
import * as appSelectors from "./selectors"
import {createAction} from "@reduxjs/toolkit";
import {AppStatusType} from "./appTypes";

//reducer
const appReducer = slice.reducer
//actions

const setAppStatusAC = createAction<{ status: AppStatusType }>('app/setAppStatus')
const setAppErrorAC = createAction<{ error: string | null }>('app/setAppError')

const appActions = {
    ...slice.actions,
    ...asyncActions,
    setAppStatusAC,
    setAppErrorAC

}
//export
export {
    appSelectors,
    appActions,
    appReducer
}
