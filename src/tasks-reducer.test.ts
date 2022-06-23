import {v1} from "uuid";
import {addTaskAC, changedStatusTaskAC, changedTitleTaskAC, removeTaskAC, TasksReducer} from "./tasks-reducer";

let todolistId_1 = v1()
let todolistId_2 = v1()

const startState = {
    [todolistId_1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "English A2", isDone: true},
    ],
    [todolistId_2]: [
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Angular", isDone: false},
        {id: v1(), title: "Backend", isDone: false},
        {id: v1(), title: "English B2", isDone: false}]
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

test('status correct task should be changed from correct array', () => {

    const action = changedStatusTaskAC(startState[todolistId_2][0].id,true, todolistId_2);
    const endState = TasksReducer(startState, action)

    expect(endState).not.toBe(startState)
    expect(endState[todolistId_2].length).toBe(4)
    expect(endState[todolistId_2][0].isDone).toBe(true)
});

