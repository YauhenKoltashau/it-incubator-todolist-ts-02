import React, {useEffect, useState} from 'react'
import {todolistAPI} from "./src/api/todolist-api";

export default {
    title: 'API'
}

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

