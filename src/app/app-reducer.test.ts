import {AppReducer, setAppErrorAC, setAppStatusAC, InitialStateType} from "./app-reducer";
let startState:InitialStateType
beforeEach(()=>{
    startState = {
        isInitialized: false,
        status: 'idle',
        error: "some error!"
    }
})
test('error message should be set',()=>{
    const endState = AppReducer(startState,setAppErrorAC({error:'error'}))
    // expect(endState).not.toBe(startState)
    expect(endState.error).toBe('error')
    expect(endState.status).toBe('idle')

})
test('status should be applied',()=>{

    const endState = AppReducer(startState,setAppStatusAC({status:'succeded'}))
    // expect(endState).not.toBe(startState)
    expect(endState.error).toBe('some error!')
    expect(endState.status).toBe('succeded')

})