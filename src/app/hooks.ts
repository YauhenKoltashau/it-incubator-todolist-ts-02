import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {AppDispatch, AppRootState} from "../utils/types";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector

