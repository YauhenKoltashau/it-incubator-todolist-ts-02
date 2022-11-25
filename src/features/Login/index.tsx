import {Login}  from './Login'
import {asyncActions} from "./login-reducer";
import {slice} from './login-reducer'

const loginActions ={
    ...asyncActions,
    ...slice.actions
}
export {
    Login,
    loginActions
}