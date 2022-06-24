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
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('new title').then( (res) => {
            setState(res.data);
        } )


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "6753a66f-c3b3-4e3b-88aa-1c0a294e34dd";
        todolistAPI.deleteTodolist(todolistId).then( (res) => {
            setState(res.data);
        })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "2a967033-9535-4689-853e-0c0d186c5ebe";
        todolistAPI.updateTodolist(todolistId, 'new title3333333')
            .then((res) => {
                setState(res.data)
            })


    }, [])

    return <div> {JSON.stringify(state)}</div>
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
    useEffect(() => {
        taskAPI.createTask("2a967033-9535-4689-853e-0c0d186c5ebe",'new title').then( (res) => {
            setState(res.data);
        } )


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "2a967033-9535-4689-853e-0c0d186c5ebe";
        const tasksId = "2cba0bc5-4f37-404e-a23f-7db2b49881d2"
        taskAPI.deleteTask(todolistId,tasksId).then( (res) => {
            setState(res.data);
        })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "2a967033-9535-4689-853e-0c0d186c5ebe";
        const tasksId = "c2a2f873-3ff2-4f74-9a05-62024184c871"
        taskAPI.updateTask(todolistId,tasksId,'new task111111').then( (res) => {
            setState(res.data);
        })


    }, [])

    return <div> {JSON.stringify(state)}</div>
}

