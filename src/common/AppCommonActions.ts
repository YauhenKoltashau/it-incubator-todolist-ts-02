import {appActions} from "../app";

export const activeAppStatusSucceded =(dispatch: any)=> dispatch(appActions.setAppStatusAC({status: 'succeded'}))
export const activeAppStatusLoading =(dispatch: any)=> dispatch(appActions.setAppStatusAC({status: 'loading'}))