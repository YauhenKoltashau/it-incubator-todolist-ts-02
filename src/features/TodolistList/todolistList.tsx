import React, {useCallback, useEffect} from "react";
import {useActions, useAppSelector} from "../../app/hooks";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {todolistsActions} from "./index";

type PropsType = {
    demo?: boolean
}
export const    TodolistList = React.memo( ({demo = false}: PropsType) => {
    const todolists = useAppSelector(state => state.todolists)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const serverError = useAppSelector(state => state.app.error)
    const {addTodolistThunk, fetchTodolistsThunk} = useActions(todolistsActions)
    const addTodolistHandler = useCallback(async(title) => addTodolistThunk({title}),[])


    useEffect(() => {
        if (!demo && isAuth) {
            fetchTodolistsThunk()
        }
    }, [])

    const todolistsForRender = todolists.map((tl) => {
            return (
                <div key={tl.id} style={{display: 'flex', margin: '10px'}}>
                    <Grid container spacing={7} style={{display: 'flex'}}>
                        <Grid item key={tl.id}>
                            <Paper elevation={2} style={{
                                background: 'whitesmoke',
                                border: 0,
                                borderRadius: 3,
                                boxShadow: 'grey',
                                padding: '0 30px',
                                width: '300px'
                            }}>
                                <Todolist
                                    todolist={tl}
                                    key={tl.id}
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
            <Grid container style={{width:'100%'}}>
                <Grid item
                      style={{
                          display: 'flex',
                          overflowX: 'scroll',
                      }}>
                    <Grid container style={{padding: '20px'}}>
                        <div
                            style={{
                                width: '300px'}}>
                            <AddItemForm
                                addItem={addTodolistHandler}
                                name={'add todolist'}
                                serverError={serverError}
                            />
                        </div>
                    </Grid>
                {todolistsForRender}
                </Grid>
            </Grid>



    )

})