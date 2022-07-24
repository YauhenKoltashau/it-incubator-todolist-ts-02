import {AppReducer, setAppErrorAC, setAppStatusAC, InitialStateType} from "./app-reducer";
let startState:InitialStateType
beforeEach(()=>{
    startState = {
        status: 'idle',
        error: "some error!"
    }
})
test('error message should be set',()=>{
    const startState:InitialStateType = {
        status: 'idle',
        error: "some error!"
    }
    const endState = AppReducer(startState,setAppErrorAC('error'))
    expect(endState).not.toBe(startState)
    expect(endState.error).toBe('error')
    expect(endState.status).toBe('idle')

})
test('status should be applied',()=>{

    const endState = AppReducer(startState,setAppStatusAC('succeded'))
    expect(endState).not.toBe(startState)
    expect(endState.error).toBe('some error!')
    expect(endState.status).toBe('succeded')

})