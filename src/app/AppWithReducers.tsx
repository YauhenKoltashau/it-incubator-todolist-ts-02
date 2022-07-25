import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "../features/TodolistList/Todolist/Todolist";
import {AddItemForm} from "../components/AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    setTodolistsAC,
    TodolistDomainType
} from "../features/TodolistList/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/tasks-api";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";
import {addTaskAC, changedStatusTaskAC, changedTitleTaskAC, removeTaskAC} from "../features/TodolistList/tasks-reducer";
import {v1} from "uuid";

export type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}
type PropsType = {
    demo?: boolean
}
const AppWithReducers = React.memo(function ({demo = false}:PropsType) {
    console.log('AppWR is render')
    //BLL:
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState,Array<TodolistDomainType>>(state => state.todolists)
    // const todolists = useAppSelector(state => state.todolists)

    useEffect(()=>{
        dispatch(setTodolistsAC(todolists))
    },[])

//todolists

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    },[])
    const addTodolist = useCallback((title:string) => {
        const action = addTodolistAC({title, addedDate:'',order:0,id:v1()})
        dispatch(action)
    },[])
    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        const action = changeTitleTodolistAC(todolistId,title)
        dispatch(action)
    },[])
    const addTask = useCallback((todolistId:string, title: string) => {
        dispatch(addTaskAC({
            todoListId:todolistId,
            title,
            id:v1(),
            addedDate: '',
            deadline: '',
            order: 0,
            status:TaskStatuses.New,
            priority:TaskPriorities.Low,
            startDate: '',
            description: ''
        }))
    },[dispatch])
    const onClickRemoveTaskHandler = useCallback((taksId: string, todolistId: string) => {
            dispatch(removeTaskAC(taksId,todolistId))
        },[dispatch])
    const changeTitleTask = useCallback((todolistId: string, title: string, taskID: string) => {
        dispatch(changedTitleTaskAC(title,taskID, todolistId ))
    },[dispatch])
    const checkboxHandler = useCallback((todolistId: string, taskID: string, status: TaskStatuses) => {
        dispatch(changedStatusTaskAC(todolistId, taskID, status))
    }, [dispatch])
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

export default AppWithReducers;
