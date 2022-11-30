import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {appActions} from "./index";
import {InitialStateType} from "./appTypes";
import {loginActions} from "../features/Login";


// thunk creator

const initializeAppThunk = createAsyncThunk('app/initializeAppThunk', async (param, thunkAPI) => {
    try {
        let promise = thunkAPI.dispatch(loginActions.AuthMeThunk({}))
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initializeAppThunk.fulfilled, (state) => {
                state.status = 'succeded'
                state.isInitialized = true
            })
            .addCase(appActions.setAppStatusAC, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(appActions.setAppErrorAC, (state, action) => {
                state.error = action.payload.error
            })
    },
})

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
