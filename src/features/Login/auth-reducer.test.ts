import {AuthMeThunk, AuthReducer, AuthStateType} from "./auth-reducer";

test('is authorezed user should be set', ()=>{
    const startState: AuthStateType = {
        id: null,
        login: null,
        email: null,
        isAuth: false
    }
    let param = {id: 4231, login: "Jardin", email:"Jardin@gmail.com", isAuth:true}
    let action = AuthMeThunk.fulfilled(param,'',param)
    let endState = AuthReducer(startState, action)

    // expect(endState).not.toBe(startState)
    expect(endState.id).toBe(4231)
    expect(endState.login).toBe("Jardin")
    expect(endState.email).toBe("Jardin@gmail.com")
    expect(endState.isAuth).toBe(true)

})
