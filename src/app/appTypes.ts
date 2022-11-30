//types
import {appActions} from "./index";

export type AppReducerActionsType =
    | ReturnType<typeof appActions.setAppStatusAC>
    | ReturnType<typeof appActions.setAppErrorAC>
export type AppStatusType = 'idle' | 'loading' | 'succeded' | 'failed'
export type InitialStateType = {
    isInitialized: boolean
    status: AppStatusType
    error: string | null
}