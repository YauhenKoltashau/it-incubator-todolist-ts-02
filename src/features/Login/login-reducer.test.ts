import {loginActions, loginReducer, types} from "./index";

test('login data should be added',()=>{
    const startState: types.LoginStateType={
        email: '',
        password: '',
        rememberMe: false,
    }
    const param = {email:"Yauhen.koltashau.1985@gmail",password: "1714706",rememberMe: false}
    let action = loginActions.LoginThunk.fulfilled({param},'', param)
    let endState = loginReducer(startState,action )

    // expect(endState).not.toBe(startState)
    expect(endState.email).toBe("Yauhen.koltashau.1985@gmail")
})