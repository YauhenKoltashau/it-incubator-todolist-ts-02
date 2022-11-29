import React, {useCallback, useEffect} from 'react';
import '../../app/App.css';
import {Todolist} from "../../features/TodolistList/Todolist/Todolist";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {ErrorSnackbar} from "../ErrorSnackBar/ErrorSnackBar";
import {useDispatch} from "react-redux";
import {v1} from "uuid";
import {useAppSelector} from "../../app/hooks";
import {tasksActions, todolistsActions} from "../../features/TodolistList";
import {useActions} from "../../utils/redux-utils";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/types";

export type TaskStateType = {
    [todolistId: string]: Array<TaskType>
}
type PropsType = {
    demo?: boolean
}
const AppWithReducers = React.memo(function ({demo = false}:PropsType) {
    debugger
    console.log('AppWR is render')
    //BLL:
    const dispatch = useDispatch()
    const todolists = useAppSelector(state => state.todolists)
    // const todolists = useSelector<AppRootState,Array<TodolistDomainType>>(state => state.todolists)
    // const todolists = useAppSelector(state => state.todolists)
    const {deleteTaskThunk, addTaskThunk, updateTaskThunk} = useActions(tasksActions)
    const {addTodolistThunk, changeTodolistTitleThunk, fetchTodolistsThunk, removeTodolistThunk} = useActions(todolistsActions)


    useEffect(()=>{
        fetchTodolistsThunk()
    },[])

//todolists

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistThunk.fulfilled({id: todolistId}, 'requestId', {todolistId})
        dispatch(action)
    },[])
    const addTodolist = useCallback((title:string) => {
        const action = addTodolistThunk.fulfilled({todolist:{title, addedDate:'',order:0,id:v1()}}, 'requestId', {title})
        dispatch(action)
    },[])
    const changeTodolistTitle = useCallback((title: string, todolistId: string) => {
        const action = changeTodolistTitleThunk.fulfilled({id: todolistId, title:title}, 'requestId', {todolistId, title})
        dispatch(action)
    },[])
    const addTask = useCallback((todolistId:string, title: string) => {
        dispatch(addTaskThunk.fulfilled({task: {
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
        }}, '', {todolistId, title}))
    },[dispatch])
    //remove Task
    const onClickRemoveTaskHandler = useCallback((taskId: string, todolistId: string) => {
            dispatch(deleteTaskThunk.fulfilled({taskId,todolistId},'', {taskId,todolistId}))
        },[dispatch])
    //change task title
    const changeTitleTask = useCallback((todolistId: string, title: string, taskID: string) => {
        let updateDataModel = {
            todolistId, taskId: taskID, domainModel: {title}}
        dispatch(updateTaskThunk.fulfilled(updateDataModel, 'requestId', updateDataModel))
    },[dispatch])
    // change checkbox status
    const checkboxHandler = useCallback((todolistId: string, taskID: string, status: TaskStatuses) => {
        let updateDataModel = {todolistId, taskId: taskID, domainModel:{status}}
        dispatch(updateTaskThunk.fulfilled( updateDataModel,'requestId', updateDataModel))
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
                    <AddItemForm addItem={async()=>{}} name={'add todolist'}/>
                </Grid>
                <Grid container spacing={7}>
                    {todolistsForRender}
                </Grid>
            </Container>

        </div>
    );
})

export default AppWithReducers;
