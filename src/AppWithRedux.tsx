import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
} from "./todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";
import {TaskType} from "./stories/src/api/tasks-api";



export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}

const AppWithRedux = React.memo(function () {
    console.log('AppWR is render')
    //BLL:
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState,Array<TodolistDomainType>>(state => state.todolists)

//todolists

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    },[])
    const addTodolist = useCallback((title:string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    },[])
    const changeTodolistTitle = useCallback((title: string, tlId: string) => {
        const action = changeTitleTodolistAC(title,tlId)
        dispatch(action)
    },[])

    const todolistsForRender = todolists.map((tl) => {
        return (<Grid item key={tl.id}>
                <Paper elevation={2} style={{background: 'whitesmoke',
                    border: 0,
                    borderRadius: 3,
                    boxShadow: 'grey',
                    padding: '0 30px',}}>
                    <Todolist
                        key={tl.id}
                        title={tl.title}
                        todolistId={tl.id}
                        // changeFilterHandler={changeFilterHandler}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist} name={'add todolist'}/>
                </Grid>
                <Grid container spacing={7}>
                    {todolistsForRender}
                </Grid>
            </Container>

        </div>
    );
})

export default AppWithRedux;
