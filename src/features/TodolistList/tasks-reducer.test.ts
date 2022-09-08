import {v1} from "uuid";
import {
    addTaskAC,
    removeTaskAC,
    setTaskAC,
    TasksReducer, updateTaskAC
} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/tasks-api";

let todolistId_1 = v1()
let todolistId_2 = v1()

const startState = {
    [todolistId_1]: [
        {
            id: v1(),
            title: "HTML&CSS",
            status: 1,
            addedDate: '',
            startDate: '',
            order: 1,
            deadline: '',
            description: '',
            priority: 0,
            todoListId: todolistId_1
        },
        {
            id: v1(),
            title: "JS",
            status: 1,
            addedDate: '',
            startDate: '',
            order: 1,
            deadline: '',
            description: '',
            priority: 0,
            todoListId: todolistId_1
        },
        {
            id: v1(),
            title: "CSS",
            status: 1,
            addedDate: '',
            startDate: '',
            order: 1,
            deadline: '',
            description: '',
            priority: 0,
            todoListId: todolistId_1
        },
        {
            id: v1(),
            title: "English A2",
            status: 1,
            addedDate: '',
            startDate: '',
            order: 1,
            deadline: '',
            description: '',
            priority: 0,
            todoListId: todolistId_1
        },
    ],
    [todolistId_2]: [
        {
            id: v1(),
            title: "React",
            status: TaskStatuses.New,
            addedDate: '',
            startDate: '',
            order: 1,
            deadline: '',
            description: '',
            priority: TaskPriorities.Low,
            todoListId: todolistId_2
        },
        {
            id: v1(),
            title: "Angular",
            status: TaskStatuses.New,
            addedDate: '',
            startDate: '',
            order: 1,
            deadline: '',
            description: '',
            priority: TaskPriorities.Low,
            todoListId: todolistId_2
        },
        {
            id: v1(),
            title: "Backend",
            status: TaskStatuses.New,
            addedDate: '',
            startDate: '',
            order: 1,
            deadline: '',
            description: '',
            priority: TaskPriorities.Low,
            todoListId: todolistId_2
        },
        {
            id: v1(),
            title: "English B2",
            status: TaskStatuses.New,
            addedDate: '',
            startDate: '',
            order: 1,
            deadline: '',
            description: '',
            priority:TaskPriorities.Low,
            todoListId: todolistId_2
        }]
}
//unit tests
test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC({taskId: startState[todolistId_2][1].id, todolistId: todolistId_2});
    const endState = TasksReducer(startState, action)

    expect(endState).not.toBe(startState)
    expect(endState[todolistId_2].length).toBe(3)
    expect(endState[todolistId_2][1].title).toBe("Backend")
});
test('correct task should be added from correct array', () => {

    const action = addTaskAC({task:{
        title: 'newTask',
        todoListId: todolistId_2,
        id: 'ffffff',
        status: TaskStatuses.New,
        priority: 0,
        order: 0,
        deadline: '',
        startDate: '',
        description: '',
        addedDate: ''
    }});
    const endState = TasksReducer(startState, action)

    expect(endState).not.toBe(startState)
    expect(endState[todolistId_2].length).toBe(5)
    expect(endState[todolistId_2][0].title).toBe("newTask")
});
test('tasks should be added', () => {
    let newTasks: TaskType[] = [
        {
            id: v1(),
            title: "Redux",
            status: 1,
            addedDate: '',
            startDate: '',
            order: 1,
            deadline: '',
            description: '',
            priority: 0,
            todoListId: todolistId_2
        },
        {
            id: v1(),
            title: "Toolkit",
            status: 1,
            addedDate: '',
            startDate: '',
            order: 1,
            deadline: '',
            description: '',
            priority: 0,
            todoListId: todolistId_2
        },
        {
            id: v1(),
            title: "Thunk",
            status: 1,
            addedDate: '',
            startDate: '',
            order: 1,
            deadline: '',
            description: '',
            priority: 0,
            todoListId: todolistId_2
        },
        {
            id: v1(),
            title: "English C1",
            status: 1,
            addedDate: '',
            startDate: '',
            order: 1,
            deadline: '',
            description: '',
            priority: 0,
            todoListId: todolistId_2
        }]
    const action = setTaskAC({todolistId: todolistId_2, tasks:newTasks});
    const endState = TasksReducer(startState, action)

    expect(endState).not.toBe(startState)
    expect(endState[todolistId_2].length).toBe(4)
    expect(endState[todolistId_2][3].title).toBe("English C1")
});
test('update task should be worked correctly', () => {

    //update status
    const testAction1 = updateTaskAC( {todolistId: todolistId_2, taskId: startState[todolistId_2][0].id, domainModel: {status:TaskStatuses.Completed}});
    const testState1 = TasksReducer(startState, testAction1)

    expect(testState1).not.toBe(startState)
    expect(testState1[todolistId_2][0].status).toBe(TaskStatuses.Completed)
    //update title
    const testAction2 = updateTaskAC( {todolistId: todolistId_2, taskId: startState[todolistId_2][0].id, domainModel: {title:'new title'}});
    const testState2 = TasksReducer(startState, testAction2)
    expect(testState2[todolistId_2][0].title).toBe('new title')
});
