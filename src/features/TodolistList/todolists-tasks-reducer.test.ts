import {
    addTodolistAC,
    removeTodolistAC,
    setTodolistsAC,
    TodolistDomainType,
    TodolistsReducer
} from "./todolists-reducer";
import {TasksReducer, TaskStateType} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";

test('new array should be added when new todolist is added', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodolistAC({id:"todolistId", title: "new todolist", addedDate: '', order: 0});

    const endTasksState = TasksReducer(startTasksState, action)
    const endTodolistsState = TodolistsReducer(startTodolistsState, action)


    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0]

    expect(keys.length).toBe(1);
    expect(idFromTasks).toBe(action.todolist.id)
    expect(endTodolistsState[0].id).toBe("todolistId")
});

test('todolist must have be deleted',()=>{
    const startState: TaskStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status:TaskStatuses.Completed, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:TaskPriorities.Low,todoListId:"todolistId1"},
            { id: "2", title: "JS", status:TaskStatuses.Completed, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:TaskPriorities.Low,todoListId:"todolistId1" },
            { id: "3", title: "React", status:TaskStatuses.Completed, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:TaskPriorities.Low,todoListId:"todolistId1"}
        ],
        "todolistId2": [
            { id: "1", title: "bread", status:TaskStatuses.Completed, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:TaskPriorities.Low,todoListId:"todolistId2" },
            { id: "2", title: "milk", status:TaskStatuses.Completed, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:TaskPriorities.Low,todoListId:"todolistId2"},
            { id: "3", title: "tea", status:TaskStatuses.Completed, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:TaskPriorities.Low,todoListId:"todolistId2" }
        ]
    };

    const action = removeTodolistAC("todolistId2");

    const endState = TasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
})

test('empty arrays should be added when the todolists set',()=>{
    const action = setTodolistsAC([
        {id: 'todolistId_1', addedDate:"220315", order: 3, title: 'What to almost learn'},
        {id: 'todolistId_2',addedDate:"220315", order: 4, title: 'What to want to learn'}
    ])
    const endState = TasksReducer({},action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(2)
    expect(endState['todolistId_1']).toBeDefined()
    expect(endState['todolistId_2']).toBeDefined()
    expect(endState['todolistId_1']).toStrictEqual([])
    expect(endState['todolistId_2']).toStrictEqual([])
})

