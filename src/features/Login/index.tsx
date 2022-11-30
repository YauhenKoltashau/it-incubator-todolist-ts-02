import {Login}  from './Login'
import {asyncActions as asyncLoginActions} from "./login-reducer";
import {asyncActions as asyncAuthActions} from "./auth-reducer";
import {slice as loginSlice} from './login-reducer'
import {slice as authSlice} from './auth-reducer'
import * as types from './loginTypes'

//reducer
const authReducer = authSlice.reducer
const loginReducer = loginSlice.reducer

//actions
const loginActions ={
    ...asyncLoginActions,
    ...asyncAuthActions,
    ...loginSlice.actions,
    ...authSlice.actions
}
//export
export {
    Login,
    loginActions,
    authReducer,
    loginReducer,
    types
}