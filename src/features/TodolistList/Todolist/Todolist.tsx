import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableItem} from "../../../components/EditableItem/EditableItem";
import {Button, IconButton, Paper, PropTypes} from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";
import {Task} from "./Task/Task";
import {useActions, useAppSelector} from "../../../app/hooks";
import {tasksActions, todolistsActions} from "../index";
import {selectTasks} from "../../../app/selectors";


type PropsType = {
    todolist: TodolistDomainType
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {
    console.log('Todolist is rendered')
    //selector
    const tasks = useAppSelector(selectTasks)[props.todolist.id]
    const serverError = useAppSelector(state=>state.app.error)
    //actions
    const {changeFilterTodolist, removeTodolistThunk, changeTodolistTitleThunk} = useActions(todolistsActions)
    const {fetchTasksThunk, addTaskThunk} = useActions(tasksActions)

    useEffect(() => {
        if (!demo) {
            fetchTasksThunk(props.todolist.id)
        }
    }, [])
    //logic
    let changeTasksFilter = tasks
    if (props.todolist.filter === 'Active') {
        changeTasksFilter = changeTasksFilter.filter((el) => !el.status)
    }
    if (props.todolist.filter === 'Completed') {
        changeTasksFilter = changeTasksFilter.filter((el) => el.status)
    }
    const renderFilterButton = (buttonFilter: FilterValuesType) => {
        return <Button
            variant={props.todolist.filter === buttonFilter ? 'contained' : 'text'}
            onClick={() => changeFilterTodolist({filter: buttonFilter, id: props.todolist.id})}
            color={props.todolist.filter === buttonFilter ? 'secondary' : 'inherit'}>{buttonFilter}
        </Button>
    }

    return <div style={{position: 'relative'}}>
        <IconButton disabled={props.todolist.entityStatus === 'loading'} size={'small'}
                    onClick={() => removeTodolistThunk({todolistId: props.todolist.id})}
                    style={{position:'absolute', right: '-31px', top: '-2px'}}
        >
            <HighlightOffIcon/>
        </IconButton>
        <Paper elevation={2} style={{textAlign: 'center'}}>
            <h3 style={{background: 'whitesmoke', padding: '2px', width: 'auto'}}>
                <EditableItem title={props.todolist.title}
                              changeTitleTask={(title) => changeTodolistTitleThunk({
                                  todolistId: props.todolist.id,
                                  title
                              })}/>
            </h3>
        </Paper>
        <div>
            <AddItemForm
                disabled={props.todolist.entityStatus === 'loading'}
                addItem={useCallback(async(title) => addTaskThunk({todolistId: props.todolist.id, title: title}),[props.todolist.id])}
                name={'add task'}
                serverError={serverError}
            />
        </div>
        <ul>{changeTasksFilter.map(task => <Task key={task.id} task={task} todolistId={props.todolist.id}/>)
        }
            { !changeTasksFilter.length && <div style={{padding: '10px',color: 'gray'}}>No tasks</div>}
        </ul>
        <div>
            {renderFilterButton('All')}
            {renderFilterButton('Active',)}
            {renderFilterButton('Completed')}
        </div>
    </div>
})
