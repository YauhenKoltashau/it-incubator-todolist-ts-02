import {v1} from "uuid";
import {addTodolistAC, FilterValuesType, setTodolistsAC, TodolistsReducer} from "./todolists-reducer";
import {TodolistType} from "../../api/todolist-api";

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
    const startStateWithDomain = TodolistsReducer([],setTodolistsAC(startState))
    expect(startStateWithDomain.length).toBe(2)
    expect(startStateWithDomain[0].filter).toBeDefined()
    const endState = TodolistsReducer(startStateWithDomain, {type:"REMOVE-TODOLIST",id:todolistId_2})
    expect(endState).not.toBe(startState)
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId_1)
})
test('correct todolist should be added', () => {
    const startStateWithDomain = TodolistsReducer([],setTodolistsAC(startState))
    const endState = TodolistsReducer(startStateWithDomain, addTodolistAC({id:"todolistId", title: newTitleForTodolist, addedDate: '', order: 0}))
    expect(endState).not.toBe(startState)
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTitleForTodolist);
});
test('correct todolist should change its name', () => {
    const startStateWithDomain = TodolistsReducer([],setTodolistsAC(startState))
    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId_2,
        title: newTitleForTodolist
    }as const;

    const endState = TodolistsReducer(startStateWithDomain,action);
    expect(endState).not.toBe(startState)
    expect(endState[0].title).toBe("What to almost learn");
    expect(endState[1].title).toBe(newTitleForTodolist);
});
test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "Completed";
    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId_2,
        filter: newFilter
    }as const;
    const startStateWithFilter = TodolistsReducer([],setTodolistsAC(startState))
    const endState = TodolistsReducer(startStateWithFilter, action);
    expect(endState).not.toBe(startState)
    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});
test('correct status of todolist should be changed', () => {
    let newFilter: FilterValuesType = "Completed";
    const action = {
        type: 'CHANGE-ENTITY-STATUS',
        id: todolistId_2,
        status: 'loading'
    }as const;
    const startStateWithDomain = TodolistsReducer([],setTodolistsAC(startState))
    const endState = TodolistsReducer(startStateWithDomain, action);
    expect(endState).not.toBe(startState)
    expect(endState[0].entityStatus).toBeDefined()
    expect(endState[1].entityStatus).toBe('loading')
});





