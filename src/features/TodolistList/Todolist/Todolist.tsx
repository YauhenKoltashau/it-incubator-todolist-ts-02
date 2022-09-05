import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableItem} from "../../../components/EditableItem/EditableItem";
import {Button, IconButton, Paper} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {
    fetchTasksThunk,
} from "../tasks-reducer";
import {changeFilterTodolistAC, FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {Task} from "./Task/Task";
import {TaskStatuses} from "../../../api/tasks-api";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";


type PropsType = {
    todolist:TodolistDomainType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (tlId: string, title: string,) => void
    addTask: (todolistId: string, title: string) => void
    onClickRemoveTaskHandler: (taksId: string, todolistId: string) => void
    changeTitleTask: (todolistId: string, title: string, taskID: string) => void
    checkboxHandler: (todolistId: string, taskID: string, status: TaskStatuses) => void
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {
    console.log('Todolist is rendered')
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks[props.todolist.id])
    useEffect(() => {
        if (!demo) {
            dispatch(fetchTasksThunk(props.todolist.id))

        }
    }, [])

//tasks
    const changeFilterHandler = useCallback((filter: FilterValuesType, todolistId: string) => {
        const action = changeFilterTodolistAC(filter, todolistId)
        dispatch(action)
    }, [dispatch])

    let changeFilter = tasks
    if (props.todolist.filter === 'Active') {
        changeFilter = changeFilter.filter((el) => !el.status)
    }
    if (props.todolist.filter === 'Completed') {
        changeFilter = changeFilter.filter((el) => el.status)
    }


    return <div>
        <Paper elevation={2} style={{textAlign: 'center'}}>
            <h3 style={{background: 'whitesmoke', padding: '2px', width: 'auto'}}>
                <EditableItem title={props.todolist.title}
                              changeTitleTask={(title) => props.changeTodolistTitle(title, props.todolist.id)}/>


            </h3>
        </Paper>
        <div>
            <div><IconButton disabled={props.todolist.entityStatus === 'loading'} size={'small'} onClick={() => props.removeTodolist(props.todolist.id)}>
                <HighlightOffIcon/>
            </IconButton></div>
            <AddItemForm
                disabled={props.todolist.entityStatus === 'loading'}
                addItem={(title) => props.addTask(props.todolist.id, title)}
                name={'add task'}
            />
        </div>
        <ul>{changeFilter.map((task) => {

            return (
                <Task
                    key={task.id}
                    task={task}
                    todolistId={props.todolist.id}
                    onClickRemoveTaskHandler={props.onClickRemoveTaskHandler}
                    checkboxHandler={props.checkboxHandler}
                    changeTitleTask={(title, taskId) => props.changeTitleTask(props.todolist.id, title, taskId)}
                />
            )
        })
        }
        </ul>
        <div>
            <Button
                style={{margin: '2px', width: '100px'}}
                variant={props.todolist.filter === 'All' ? 'contained' : 'text'}
                disableElevation
                onClick={() => changeFilterHandler('All', props.todolist.id)}
                color={props.todolist.filter === 'All' ? 'secondary' : 'inherit'}>
                All
            </Button>
            <Button
                style={{margin: '2px', width: '100px'}}
                variant={props.todolist.filter === 'Active' ? 'contained' : 'text'}
                disableElevation
                onClick={() => changeFilterHandler('Active', props.todolist.id)}
                color={props.todolist.filter === 'Active' ? 'secondary' : 'inherit'}>
                Active
            </Button>
            <Button
                style={{margin: '2px', width: "100px"}}
                variant={props.todolist.filter === 'Completed' ? 'contained' : 'text'}
                disableElevation
                onClick={() => changeFilterHandler('Completed', props.todolist.id)}
                color={props.todolist.filter === 'Completed' ? 'secondary' : 'inherit'}
                name={'Completed'}>
                Completed
            </Button>
        </div>
    </div>
})
