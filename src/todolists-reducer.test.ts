import {v1} from "uuid";
import {addTodolistAC, FilterValuesType, setTodolistsAC, TodolistsReducer} from "./todolists-reducer";
import {TodolistType} from "./stories/src/api/todolist-api";

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
    const startStateWithFilter = TodolistsReducer([],setTodolistsAC(startState))
    expect(startStateWithFilter.length).toBe(2)
    expect(startStateWithFilter[0].filter).toBeDefined()
    const endState = TodolistsReducer(startStateWithFilter, {type:"REMOVE-TODOLIST",id:todolistId_2})
    expect(endState).not.toBe(startState)
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId_1)
})
test('correct todolist should be added', () => {
    const startStateWithFilter = TodolistsReducer([],setTodolistsAC(startState))
    const endState = TodolistsReducer(startStateWithFilter, addTodolistAC(newTitleForTodolist))
    expect(endState).not.toBe(startState)
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTitleForTodolist);
});
test('correct todolist should change its name', () => {
    const startStateWithFilter = TodolistsReducer([],setTodolistsAC(startState))
    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId_2,
        title: newTitleForTodolist
    }as const;

    const endState = TodolistsReducer(startStateWithFilter,action);
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





