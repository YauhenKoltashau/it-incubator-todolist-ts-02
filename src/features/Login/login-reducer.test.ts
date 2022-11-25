import {LoginReducer, LoginStateType, LoginThunk} from "./login-reducer";

test('login data should be added',()=>{
    const startState: LoginStateType={
        email: '',
        password: '',
        rememberMe: false,
    }
    const param = {email:"Yauhen.koltashau.1985@gmail",password: "1714706",rememberMe: false}
    let action = LoginThunk.fulfilled({param},'', param)
    let endState = LoginReducer(startState,action )

    // expect(endState).not.toBe(startState)
    expect(endState.email).toBe("Yauhen.koltashau.1985@gmail")
})