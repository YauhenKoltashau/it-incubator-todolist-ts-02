import {appActions,appReducer} from "./index";
import {InitialStateType} from "./appTypes";
let startState:InitialStateType
beforeEach(()=>{
    startState = {
        isInitialized: false,
        status: 'idle',
        error: "some error!"
    }
})
test('error message should be set',()=>{
    const endState = appReducer(startState,appActions.setAppErrorAC({error:'error'}))
    // expect(endState).not.toBe(startState)
    expect(endState.error).toBe('error')
    expect(endState.status).toBe('idle')

})
test('status should be applied',()=>{

    const endState = appReducer(startState,appActions.setAppStatusAC({status:'succeded'}))
    // expect(endState).not.toBe(startState)
    expect(endState.error).toBe('some error!')
    expect(endState.status).toBe('succeded')

})