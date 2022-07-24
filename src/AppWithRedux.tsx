import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    IconButton,
    Typography,
    Toolbar,
    Container,
    Grid,
    Paper,
    LinearProgress
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistThunk,
    changeTodolistTitleThunk, fetchTodolistsThunk,
    removeTodolistThunk
} from "./todolists-reducer";
import {TaskStatuses, TaskType} from "./stories/src/api/tasks-api";
import {useAppDispatch, useAppSelector} from "./stories/src/app/hooks";
import {ErrorSnackbar} from "./components/ErrorSnackBar/ErrorSnackBar";
import {addTaskThunk, deleteTaskThunk, updateTaskThunk} from "./tasks-reducer";

export type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}
type PropsType = {
    demo?: boolean
}

const AppWithRedux = React.memo(function ({demo = false}:PropsType) {
    console.log('AppWR is render')
    const dispatch = useAppDispatch()
    // const todolists = useSelector<AppRootState,Array<TodolistDomainType>>(state => state.todolists)
    const todolists = useAppSelector(state => state.todolists)
    const appStatus = useAppSelector(state => state.app.status)

    useEffect(()=>{
        if(!demo){
            dispatch(fetchTodolistsThunk())
        }
    },[])

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistThunk(todolistId)
        dispatch(action)
    },[])
    const addTodolist = useCallback((title:string) => {
        const action = addTodolistThunk(title)
        dispatch(action)
    },[])
    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        const action = changeTodolistTitleThunk(todolistId,title)
        dispatch(action)
    },[])
    const addTask = useCallback((todolistId:string, title: string) => {
        dispatch(addTaskThunk(todolistId, title))
        // const maxLengthOfTitle = 101
        // if(title.length<maxLengthOfTitle){
        //     dispatch(addTaskThunk(todolistId, title))
        // }else{
        //     dispatch(setErrorAC(`not more ${maxLengthOfTitle} simbols!`))
        // }


    },[dispatch])
    const onClickRemoveTaskHandler = useCallback((taksId: string, todolistId: string) => {
        dispatch(deleteTaskThunk(todolistId, taksId))
    },[dispatch])
    const changeTitleTask = useCallback((todolistId:string, title: string, taskID: string) => {
        dispatch(updateTaskThunk(todolistId, taskID, {title} ))
    },[dispatch])
    const checkboxHandler = useCallback(( todolistId: string, taskID: string, status: TaskStatuses) => {
        dispatch(updateTaskThunk(todolistId, taskID, {status}))
    },[dispatch])

    const todolistsForRender = todolists.map((tl) => {
        return (<Grid item key={tl.id}>
                <Paper elevation={2} style={{background: 'whitesmoke',
                    border: 0,
                    borderRadius: 3,
                    boxShadow: 'grey',
                    padding: '0 30px',}}>
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
        )
    })

    return (
        <div className="App">
            <ErrorSnackbar/>
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
                {appStatus ==='loading'&& <LinearProgress />}

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
