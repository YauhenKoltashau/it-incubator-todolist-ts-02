import React, {useCallback} from 'react';
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableItem} from "./EditableItem";
import {Button, IconButton, Paper} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";
import {addTaskAC, changedStatusTaskAC, changedTitleTaskAC, removeTaskAC} from "./tasks-reducer";
import {changeFilterTodolistAC} from "./todolists-reducer";
import {Task} from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    todolistId: string
    // changeFilterHandler: (filterValue: FilterValuesType, todolistID: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (title: string, tlId: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
    console.log('Todolist is rendered')
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState,Array<TaskType>>(state => state.tasks[props.todolistId])

//tasks
    const changeFilterHandler = useCallback((filter: FilterValuesType, todolistId: string) => {
        const action = changeFilterTodolistAC(filter,todolistId)
        dispatch(action)
    },[dispatch])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.todolistId)
    },[props.changeTodolistTitle,props.todolistId])

    const onClickRemoveTaskHandler = useCallback((taksId: string, todolistId: string) => {
        dispatch(removeTaskAC(taksId,todolistId))
    },[dispatch])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.todolistId))

    },[dispatch])

    let changeFilter = tasks
    if (props.filter === 'Active') {
        changeFilter = changeFilter.filter((el) => !el.isDone)
    }
    if (props.filter === 'Completed') {
        changeFilter = changeFilter.filter((el) => el.isDone)
    }
    const checkboxHandler = useCallback((tId: string, checkedValue: boolean, todolistId: string) => {
        dispatch(changedStatusTaskAC(tId, checkedValue,todolistId))
    },[dispatch])

    const changeTitleTask = useCallback((title: string, taskID: string) => {
        dispatch(changedTitleTaskAC(title, taskID, props.todolistId))
    },[dispatch])

    return <div>
        <Paper elevation={2} style={{textAlign: 'center'}}>
            <h3 style={{background:'whitesmoke',padding: '2px', width: 'auto'}}>
                <EditableItem title={props.title} changeTitleTask={changeTodolistTitle}/>


            </h3>
        </Paper>
        <div>
            <div><IconButton size={'small'} onClick={() => props.removeTodolist(props.todolistId)}>
                <HighlightOffIcon/>
            </IconButton></div>
            <AddItemForm
                addItem={addTask}
                name={'add task'}
            />
        </div>
        <ul>{changeFilter.map((task) => {

            return (
                <Task
                    key={task.id}
                    task={task}
                    todolistId={props.todolistId}
                    onClickRemoveTaskHandler={onClickRemoveTaskHandler}
                    checkboxHandler={checkboxHandler}
                    changeTitleTask={changeTitleTask}
                />
            )
        })
        }
        </ul>
        <div>
            <Button
                style={{margin: '2px', width:'100px'}}
                variant={props.filter === 'All'?'contained': 'text'}
                disableElevation
                onClick={() => changeFilterHandler('All', props.todolistId)}
                color={props.filter === 'All' ? 'secondary' : 'inherit'}>
                All
            </Button>
            <Button
                style={{margin: '2px',width: '100px'}}
                variant={props.filter === 'Active'?'contained': 'text'}
                disableElevation
                onClick={() => changeFilterHandler('Active', props.todolistId)}
                color={props.filter === 'Active' ? 'secondary' : 'inherit'}>
                Active
            </Button>
            <Button
                style={{margin: '2px', width:"100px"}}
                variant={props.filter === 'Completed'?'contained': 'text'}
                disableElevation
                onClick={() => changeFilterHandler('Completed', props.todolistId)}
                color={props.filter === 'Completed' ? 'secondary' : 'inherit'}
                name={'Completed'}>
                Completed
            </Button>
        </div>
    </div>
})
