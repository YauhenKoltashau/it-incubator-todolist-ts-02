import React, {useCallback, useEffect} from "react";
import {
    addTodolistThunk,
    changeTodolistTitleThunk,
    fetchTodolistsThunk,
    removeTodolistThunk
} from "./todolists-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {addTaskThunk, deleteTaskThunk, updateTaskThunk} from "./tasks-reducer";
import {TaskStatuses} from "../../api/tasks-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";

type PropsType = {
    demo?: boolean
}
export const TodolistList = React.memo( ({demo = false}: PropsType) => {
    const dispatch = useAppDispatch()
    const todolists = useAppSelector(state => state.todolists)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    console.log('TodolistList')
    useEffect(() => {
        if (!demo && isAuth) {
            dispatch(fetchTodolistsThunk())
        }
    }, [])


    const addTodolist = useCallback((title: string) => {
        const action = addTodolistThunk(title)
        dispatch(action)
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistThunk(todolistId)
        dispatch(action)
    }, [])

    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        const action = changeTodolistTitleThunk(todolistId, title)
        dispatch(action)
    }, [])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskThunk(todolistId, title))
        // const maxLengthOfTitle = 101
        // if(title.length<maxLengthOfTitle){
        //     dispatch(addTaskThunk(todolistId, title))
        // }else{
        //     dispatch(setErrorAC(`not more ${maxLengthOfTitle} simbols!`))
        // }
    }, [dispatch])

    const onClickRemoveTaskHandler = useCallback((taksId: string, todolistId: string) => {
        dispatch(deleteTaskThunk(todolistId, taksId))
    }, [dispatch])

    const changeTitleTask = useCallback((todolistId: string, title: string, taskID: string) => {
        dispatch(updateTaskThunk(todolistId, taskID, {title}))
    }, [dispatch])

    const checkboxHandler = useCallback((todolistId: string, taskID: string, status: TaskStatuses) => {
        dispatch(updateTaskThunk(todolistId, taskID, {status}))
    }, [dispatch])

    const todolistsForRender = todolists.map((tl) => {
            return (
                <div key={tl.id}>
                    <Grid container spacing={7}>
                        <Grid item key={tl.id}>
                            <Paper elevation={2} style={{
                                background: 'whitesmoke',
                                border: 0,
                                borderRadius: 3,
                                boxShadow: 'grey',
                                padding: '0 30px',
                            }}>
                                <Todolist
                                    todolist={tl}
                                    key={tl.id}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                    addTask={addTask}
                                    onClickRemoveTaskHandler={onClickRemoveTaskHandler}
                                    changeTitleTask={changeTitleTask}
                                    checkboxHandler={checkboxHandler}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </div>

            )
        })
    if (!isAuth){
        return <Navigate to='/login' />
    }
    return (
            <Grid container justifyContent={'center'}>
                <Grid item >
                    <Grid container style={{padding: '20px'}}>
                        <AddItemForm addItem={addTodolist} name={'add todolist'}/>
                    </Grid>
                {todolistsForRender}
                </Grid>
            </Grid>



    )

})