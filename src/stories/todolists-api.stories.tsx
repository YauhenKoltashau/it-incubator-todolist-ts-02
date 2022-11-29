import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";
import {taskAPI} from "../api/tasks-api";
import {TaskPriorities, TaskStatuses} from "../api/types";

export default {
    title: 'API'
}

//todolists
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
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
    const [todolistId, setTodolistId] = useState('')
    const getterTask = () => {
        //2a967033-9535-4689-853e-0c0d186c5ebe
        taskAPI.getTasks(todolistId)
            .then((res) => {
                debugger
                setState(res.data);
            })
    }
    return (
        <>
            <div> {JSON.stringify(state)}</div>
            <input onChange={(e => setTodolistId(e.currentTarget.value))} value={todolistId} placeholder={'todolist Id'}/>
            <button onClick={getterTask}>GET TASK FOR THIS TODOLIST</button>
        </>)

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
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [newTitleTask, setNewTitleTask] = useState<string>('')
    const [status, setStatus] = useState<TaskStatuses>(0)
    const [description, setDescription] = useState<string>('')
    const [priority, setPriority] = useState<TaskPriorities>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const updateTask = () => {
        taskAPI.updateTask(todolistId, taskId, {
            title: newTitleTask,
            deadline: '',
            description: description,
            priority: priority,
            startDate: '',
            status: status,

        }).then((res) => {
            setState(res.data);
        })
    }
    return (<>
        <div> {JSON.stringify(state)}</div>
        <input onChange={(e) => setTodolistId(e.currentTarget.value)} value={todolistId} placeholder={"todolist id"}/>
        <input onChange={(e) => setTaskId(e.currentTarget.value)} value={taskId} placeholder={"task id"}/>
        <input onChange={(e) => setNewTitleTask(e.currentTarget.value)} value={newTitleTask} placeholder={"task title"}/>
        <input onChange={(e) => setStatus(+e.currentTarget.value)} value={status} placeholder={"task status"}/>
        <input onChange={(e) => setDescription(e.currentTarget.value)} value={description} placeholder={"task description"}/>
        <input onChange={(e) => setPriority(+e.currentTarget.value)} value={priority} placeholder={"task priority"}/>
        <input onChange={(e) => setStartDate(e.currentTarget.value)} value={startDate} placeholder={"task start date"}/>
        <input onChange={(e) => setDeadline(e.currentTarget.value)} value={deadline} placeholder={"task deadline"}/>
        <button onClick={updateTask}>UPDATE TASK</button>
    </>)

}

