import {AppRootState} from "./store";

export const selectStatus = (state:AppRootState) => state.app.status
export const selectIsInitialized = (state:AppRootState) => state.app.isInitialized
export const selectIsAuth = (state: AppRootState) => state.auth.isAuth
export const selectTasks = (state:AppRootState) => state.tasks