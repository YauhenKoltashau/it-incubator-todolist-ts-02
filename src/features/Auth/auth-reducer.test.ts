import {AuthReducer, AuthStateType, setAuthorizedUserAC} from "./auth-reducer";

test('is authorezed user should be set', ()=>{
    const startState: AuthStateType = {
        id: null,
        login: null,
        email: null,
        isAuth: false
    }
    let action = setAuthorizedUserAC(4231, "Jardin", "Jardin@gmail.com", true)
    let endState = AuthReducer(startState, action)

    expect(endState).not.toBe(startState)
    expect(endState.id).toBe(4231)
    expect(endState.login).toBe("Jardin")
    expect(endState.email).toBe("Jardin@gmail.com")
    expect(endState.isAuth).toBe(true)

})
