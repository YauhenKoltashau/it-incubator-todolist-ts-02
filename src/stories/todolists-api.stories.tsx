import React, {useEffect, useState} from 'react'
import {todolistAPI} from "./src/api/todolist-api";
import {taskAPI} from "./src/api/tasks-api";

export default {
    title: 'API'
}

//todolists
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data);
                let arr2 = res.data.push()

            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistTitle, setTodolistTitle] = useState('')
    const createTodolist = () => {
        todolistAPI.createTodolist(todolistTitle).then((res) => {
            setState(res.data);
        })
    }
    return (
        <div>
            <div> {JSON.stringify(state)}</div>
            <input value={todolistTitle} placeholder={'todolist title'}
                   onChange={e => setTodolistTitle(e.currentTarget.value)}/>
            <button onClick={createTodolist}>CREATE TODOLIST</button>

        </div>
    )
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId).then((res) => {
            setState(res.data);
        })
    }
    return (
        <>
            <div> {JSON.stringify(state)}</div>
            <input value={todolistId} placeholder={'todolist ID'}
                   onChange={e => setTodolistId(e.currentTarget.value)}/>
            <button onClick={deleteTodolist}>DELETE TODOLIST</button>
        </>)

}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [todolistTitle, setTodolistTitle] = useState('')
    const updateTodolist = () => {
        todolistAPI.updateTodolist(todolistId, todolistTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return (
        <>
            <div> {JSON.stringify(state)}</div>
            <input value={todolistId} placeholder={'todolist ID'}onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input value={todolistTitle} placeholder={'todolist title'}onChange={e => setTodolistTitle(e.currentTarget.value)}/>
            <button onClick={updateTodolist}>UPDATE TODOLIST</button>
        </>)
}

//tasks
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskAPI.getTasks("2a967033-9535-4689-853e-0c0d186c5ebe")
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskTitle, setTaskTitle] = useState('')
    const creatorTask = () => {
        taskAPI.createTask(todolistId, taskTitle).then((res) => {
            setState(res.data);
        })
    }
    return (
        <div>
            <div> {JSON.stringify(state)}</div>
            <input onChange={(e => setTodolistId(e.currentTarget.value))} value={todolistId}
                   placeholder={'todolist Id'}/>
            <input onChange={(e => setTaskTitle(e.currentTarget.value))} value={taskTitle} placeholder={'task title'}/>
            <button onClick={creatorTask}>CREATE TASK</button>
            <div>
                todolist Id: <div>{todolistId}</div>
                new Title: <div>{taskTitle}</div>
            </div>
        </div>

    )
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const deleteTask = () => {
        taskAPI.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data);
        })
    }
    return (
        <div>
            <div> {JSON.stringify(state)}</div>
            <input onChange={(e) => setTodolistId(e.currentTarget.value)} value={todolistId}
                   placeholder={"todolist id"}/>
            <input onChange={(e) => setTaskId(e.currentTarget.value)} value={taskId} placeholder={"task id"}/>
            <button onClick={deleteTask}>DELETE TASK</button>
        </div>
    )
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const [newTitleTask, setNewTitleTask] = useState('')
    const updateTask = () => {
        taskAPI.updateTask(todolistId, taskId, newTitleTask).then((res) => {
            setState(res.data);
        })
    }

    return (<>
        <div> {JSON.stringify(state)}</div>
        <input onChange={(e) => setTodolistId(e.currentTarget.value)} value={todolistId} placeholder={"todolist id"}/>
        <input onChange={(e) => setTaskId(e.currentTarget.value)} value={taskId} placeholder={"task id"}/>
        <input onChange={(e) => setNewTitleTask(e.currentTarget.value)} value={newTitleTask}
               placeholder={"task title"}/>
        <button onClick={updateTask}>UPDATE TASK</button>
    </>)

}

