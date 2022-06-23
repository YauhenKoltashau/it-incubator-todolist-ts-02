import {TaskStateType, TodolistType} from "./AppWithRedux";
import {addTodolistAC, removeTodolistAC, TodolistsReducer} from "./todolists-reducer";
import {TasksReducer} from "./tasks-reducer";

test('new array should be added when new todolist is added', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = TasksReducer(startTasksState, action)
    const endTodolistsState = TodolistsReducer(startTodolistsState, action)


    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0]

    expect(keys.length).toBe(1);
    expect(idFromTasks).toBe(action.todolistId)
    expect(endTodolistsState[0].id).toBe(action.todolistId)
});

test('todolist must have be deleted',()=>{
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };

    const action = removeTodolistAC("todolistId2");

    const endState = TasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();


})
