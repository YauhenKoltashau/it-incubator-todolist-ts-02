import {LoginReducer, LoginStateType, setLoginedUserAC} from "./login-reducer";

test('login data should be added',()=>{
    const startState: LoginStateType={
        email: '',
        password: '',
        rememberMe: false,
    }
    let action = setLoginedUserAC({email:"Yauhen.koltashau.1985@gmail",password: "1714706",rememberMe: false})
    let endState = LoginReducer(startState,action )

    // expect(endState).not.toBe(startState)
    expect(endState.email).toBe("Yauhen.koltashau.1985@gmail")
})