import {v1} from "uuid";
import {
    addTaskAC,
    changedStatusTaskAC,
    changedTitleTaskAC,
    removeTaskAC,
    setTaskAC,
    TasksReducer
} from "./tasks-reducer";
import {TaskType} from "./stories/src/api/tasks-api";

let todolistId_1 = v1()
let todolistId_2 = v1()

const startState = {
    [todolistId_1]: [
        {id: v1(), title: "HTML&CSS", status:1, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:0,todoListId:todolistId_1},
        {id: v1(), title: "JS",status:1, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:0,todoListId:todolistId_1},
        {id: v1(), title: "CSS", status:1, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:0,todoListId:todolistId_1},
        {id: v1(), title: "English A2", status:1, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:0,todoListId:todolistId_1},
    ],
    [todolistId_2]: [
        {id: v1(), title: "React", status:1, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:0,todoListId:todolistId_2},
        {id: v1(), title: "Angular",status:1, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:0,todoListId:todolistId_2},
        {id: v1(), title: "Backend", status:1, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:0,todoListId:todolistId_2},
        {id: v1(), title: "English B2", status:1, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:0,todoListId:todolistId_2}]
}
test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC(startState[todolistId_2][1].id, todolistId_2);
    const endState = TasksReducer(startState, action)

    expect(endState).not.toBe(startState)
    expect(endState[todolistId_2].length).toBe(3)
    expect(endState[todolistId_2][1].title).toBe("Backend")
});

test('correct task should be added from correct array', () => {

    const action = addTaskAC('newTask', todolistId_2);
    const endState = TasksReducer(startState, action)

    expect(endState).not.toBe(startState)
    expect(endState[todolistId_2].length).toBe(5)
    expect(endState[todolistId_2][0].title).toBe("newTask")
})
;
test('title correct task should be changed from correct array', () => {
    const action = changedTitleTaskAC('C2',startState[todolistId_2][3].id, todolistId_2);
    const endState = TasksReducer(startState, action)

    expect(endState).not.toBe(startState)
    expect(endState[todolistId_2].length).toBe(4)
    expect(endState[todolistId_2][3].title).toBe("C2")
});

test('tasks should be added', () => {
    let newTasks:TaskType[] =[
        {id: v1(), title: "Redux", status:1, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:0,todoListId:todolistId_2},
        {id: v1(), title: "Toolkit",status:1, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:0,todoListId:todolistId_2},
        {id: v1(), title: "Thunk", status:1, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:0,todoListId:todolistId_2},
        {id: v1(), title: "English C1", status:1, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:0,todoListId:todolistId_2}]
    const action = setTaskAC(todolistId_2, newTasks);
    const endState = TasksReducer(startState, action)

    expect(endState).not.toBe(startState)
    expect(endState[todolistId_2].length).toBe(4)
    expect(endState[todolistId_2][3].title).toBe("English C1")
});

test('status correct task should be changed from correct array', () => {

    const action = changedStatusTaskAC(startState[todolistId_2][0].id,2, todolistId_2);
    const endState = TasksReducer(startState, action)

    expect(endState).not.toBe(startState)
    expect(endState[todolistId_2].length).toBe(4)
    expect(endState[todolistId_2][0].status).toBe(2)
});
