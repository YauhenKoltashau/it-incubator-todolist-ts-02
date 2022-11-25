import {v1} from "uuid";
import {
    // addTodolistThunk,
    // addTodolistAC,
    changeFilterTodolist,
    // changeTitleTodolistAC,
    changeTodolistEntityStatusAC,
    // changeTodolistTitleThunk,
    // fetchTodolistsThunk,
    FilterValuesType,
    // removeTodolistThunk,
    // setTodolistsAC,
    TodolistsReducer
} from "./todolists-reducer";
import {TodolistType} from "../../api/todolist-api";
import {todolistsActions} from "./";

let todolistId_1 = v1()
let todolistId_2 = v1()
let newTitleForTodolist: string
let startState:Array<TodolistType> = []

beforeEach(()=>{
    todolistId_1 = v1()
    todolistId_2 = v1()
    newTitleForTodolist = "New Todolist"
    startState = [
        {id: todolistId_1, addedDate:"220315", order: 3, title: 'What to almost learn'},
        {id: todolistId_2,addedDate:"220315", order: 4, title: 'What to want to learn'}
    ]
})

test('correct todolist should be reducer',()=>{
    const startStateWithDomain = TodolistsReducer([],todolistsActions.fetchTodolistsThunk.fulfilled({todolists: startState},'requestId'))
    expect(startStateWithDomain.length).toBe(2)
    expect(startStateWithDomain[0].filter).toBeDefined()
    const endState = TodolistsReducer(startStateWithDomain, todolistsActions.removeTodolistThunk.fulfilled({id:todolistId_2},'requestId', {todolistId:todolistId_2} ))
    expect(endState).not.toBe(startState)
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId_1)
})
test('correct todolist should be added', () => {
    const startStateWithDomain = TodolistsReducer([],todolistsActions.fetchTodolistsThunk.fulfilled({todolists: startState}, 'requestId'))
    const data = {todolist:{id:"todolistId", title: newTitleForTodolist, addedDate: '', order: 0}}
    const endState = TodolistsReducer(startStateWithDomain, todolistsActions.addTodolistThunk.fulfilled(data, 'requestId', {title: "todolistId"}))
    expect(endState).not.toBe(startState)
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTitleForTodolist);
});
test('correct todolist should change its name', () => {
    const startStateWithDomain = TodolistsReducer([],todolistsActions.fetchTodolistsThunk.fulfilled({todolists:startState}, 'requestId'))
    const action = todolistsActions.changeTodolistTitleThunk.fulfilled({id: todolistId_2, title: newTitleForTodolist}, 'requestId', {todolistId: todolistId_2, title: newTitleForTodolist})
    const endState = TodolistsReducer(startStateWithDomain,action);
    expect(endState).not.toBe(startState)
    expect(endState[0].title).toBe("What to almost learn");
    expect(endState[1].title).toBe(newTitleForTodolist);
});
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "Completed";
    const action = changeFilterTodolist({
        id: todolistId_2,
        filter: newFilter
    })
    const startStateWithFilter = TodolistsReducer([],todolistsActions.fetchTodolistsThunk.fulfilled({todolists:startState}, 'requestId'))
    const endState = TodolistsReducer(startStateWithFilter, action);
    expect(endState).not.toBe(startState)
    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});
test('correct status of todolist should be changed', () => {
    let newFilter: FilterValuesType = "Completed";
    const action = changeTodolistEntityStatusAC({
        id: todolistId_2,
        status: 'loading'
    })
    const startStateWithDomain = TodolistsReducer([],todolistsActions.fetchTodolistsThunk.fulfilled({todolists:startState}, 'requestId'))
    const endState = TodolistsReducer(startStateWithDomain, action);
    expect(endState).not.toBe(startState)
    expect(endState[0].entityStatus).toBeDefined()
    expect(endState[1].entityStatus).toBe('loading')
});





