import React, {ChangeEvent, useCallback} from "react";
import styles from "../Todolist.module.css";
import {EditableItem} from "../../../../components/EditableItem/EditableItem";
import {IconButton} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Checkbox from "@material-ui/core/Checkbox";
import {tasksActions} from "../../index";
import {useActions} from "../../../../utils/redux-utils";
import {TaskStatuses, TaskType} from "../../../../api/types";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
        const {deleteTaskThunk, updateTaskThunk} = useActions(tasksActions)

    const changeTitleTask = (title: string) => {
        updateTaskThunk({todolistId: props.todolistId, taskId: props.task.id, domainModel: {title}})
    }
    const deleteTaskHandler = () => {
        deleteTaskThunk({
            todolistId: props.todolistId,
            taskId: props.task.id
        })
    }

    const changeStatusTask = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTaskThunk({
            todolistId: props.todolistId,
            taskId: props.task.id,
            domainModel: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}
        })
    }, [props.task.id, props.todolistId])

    return (
        <div className={props.task.status === TaskStatuses.Completed ? styles.isDone : ""} style={{position: 'relative'}}>
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                onChange={changeStatusTask}
                color={'primary'}
            />
            <EditableItem
                title={props.task.title}
                changeTitleTask={changeTitleTask}/>
            <IconButton
                style={{position: 'absolute', right: '6px', top: '6px'}}
                color={'inherit'}
                size={'small'}
                disableRipple
                onClick={deleteTaskHandler}><ClearIcon fontSize={'small'}/></IconButton>

        </div>
    )
})
