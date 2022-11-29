import {AuthMeThunk} from "../features/Login/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


// thunk creator

const initializeAppThunk = createAsyncThunk('app/initializeAppThunk', async (param, {dispatch}) => {
    try {
        let promise = dispatch(AuthMeThunk({}))
        Promise.all([promise]).then(() => {
            return undefined
        })
    } catch (e) {
        return undefined
    } finally {
        return undefined
    }

})
export const asyncActions = {
    initializeAppThunk
}

//slice
export const slice = createSlice({
    name: 'app',
    initialState: {
        isInitialized: false,
        status: 'idle',
        error: null
    } as InitialStateType,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: AppStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
    },
    extraReducers: (builder) => {
        builder.addCase(initializeAppThunk.fulfilled, (state) => {
            state.status = 'succeded'
            state.isInitialized = true
        })
    }
})

//reducer
export const AppReducer = slice.reducer
export const {
    setAppStatusAC,
    setAppErrorAC
} = slice.actions

//types
export type AppReducerActionsType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
export type AppStatusType = 'idle' | 'loading' | 'succeded' | 'failed'
export type InitialStateType = {
    isInitialized: boolean
    status: AppStatusType
    error: string | null
}

//old data v
//state
// const initialState: InitialStateType = {
//     isInitialized: false,
//     status: 'idle',
//     error: null
// }
// export const _initializeAppThunk = (): AppThunk => (dispatch) => {
//     let promise = dispatch(AuthMeThunk({}))
//     Promise.all([promise]).then(() => {
//         dispatch(setCurrentInitializeAC({value: true}))
// //     // authAPI.authMe()
// //     //     .then((res) => {
// //     //         if (res.data.resultCode === 0) {
// //     //             dispatch(setAuthorizedUserAC(res.data.data.id, res.data.data.login, res.data.data.email, true))
// //     //         } else {
// //     //
// //     //         }
//     })
// }
// setCurrentInitializeAC(state, action:PayloadAction<{value: boolean}>){
//     state.isInitialized =  action.payload.value
// }
// setCurrentInitializeAC
// | ReturnType<typeof setCurrentInitializeAC>
