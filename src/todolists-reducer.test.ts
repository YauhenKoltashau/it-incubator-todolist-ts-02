import {v1} from "uuid";

import {FilterValuesType, TodolistType} from "./AppWithRedux";
import {addTodolistAC, TodolistsReducer} from "./todolists-reducer";

test('correct todolist should be reducer',()=>{
    let todolistId_1 = v1()
    let todolistId_2 = v1()
    // zxs
    // export type TodolistType = {
    //     id: string
    //     addedDate: string
    //     order: number
    //     title: string
    //     filter: FilterValuesType
    // }
    const startState:Array<TodolistType> = [
        {id: todolistId_1, addedDate:"220315", order: 3, title: 'What to almost learn', filter: 'All'},
        {id: todolistId_2,addedDate:"220315", order: 4, title: 'What to want to learn', filter: 'All'}
    ]
    const endState = TodolistsReducer(startState, {type:"REMOVE-TODOLIST",id:todolistId_2})
    expect(endState).not.toBe(startState)
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId_1)
})


test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, addedDate:"220315", order: 3, title: 'What to almost learn', filter: 'All'},
        {id: todolistId2,addedDate:"220315", order: 4, title: 'What to want to learn', filter: 'All'}
    ]

    const endState = TodolistsReducer(startState, addTodolistAC(newTodolistTitle))
    expect(endState).not.toBe(startState)
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});
test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id: todolistId1, addedDate:"220315", order: 3, title: 'What to almost learn', filter: 'All'},
        {id: todolistId2,addedDate:"220315", order: 4, title: 'What to want to learn', filter: 'All'}
    ]
    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    }as const;

    const endState = TodolistsReducer(startState,action);
    expect(endState).not.toBe(startState)
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "Completed";

    const startState: Array<TodolistType> = [
        {id: todolistId1, addedDate:"220315", order: 3, title: 'What to almost learn', filter: 'All'},
        {id: todolistId2,addedDate:"220315", order: 4, title: 'What to want to learn', filter: 'All'}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }as const;

    const endState = TodolistsReducer(startState, action);
    expect(endState).not.toBe(startState)
    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});





