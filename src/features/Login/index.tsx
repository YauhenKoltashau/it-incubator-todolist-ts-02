import {Login}  from './Login'
import {asyncActions} from "./login-reducer";
import {slice as loginSlice} from './login-reducer'
import {slice as authSlice} from './auth-reducer'

//reducer
const authReducer = authSlice.reducer
const loginReducer = loginSlice.reducer

//actions
const loginActions ={
    ...asyncActions,
    ...loginSlice.actions,
    ...authSlice.actions
}
//export
export {
    Login,
    loginActions,
    authReducer,
    loginReducer
}