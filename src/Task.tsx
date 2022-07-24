import React, {ChangeEvent, useCallback} from "react";
import styles from "./Todolist.module.css";
import {NewCheckBox} from "./components/CheckBox";
import {EditableItem} from "./EditableItem";
import {IconButton} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import {TaskStatuses, TaskType} from "./stories/src/api/tasks-api";
import Checkbox from "@material-ui/core/Checkbox";

type TaskPropsType = {
    task:TaskType
    todolistId:string
    onClickRemoveTaskHandler:(taksId: string, todolistId: string)=>void
    checkboxHandler:( todoloistId: string, taskId:string,status: TaskStatuses)=>void
    changeTitleTask: (title: string,taskId: string)=>void
}
export const Task = React.memo((props:TaskPropsType) => {
const changeTitleTask = (title: string) => {
    props.changeTitleTask(title,props.task.id)
}
const changeStatusTask =useCallback((e: ChangeEvent<HTMLInputElement>)=>{
    let newIsDoneValue =e.currentTarget.checked
    props.checkboxHandler( props.todolistId, props.task.id,newIsDoneValue?TaskStatuses.Completed:TaskStatuses.New)
},[props.task.id,props.todolistId])
    return (
        <div className={props.task.status === TaskStatuses.Completed ? styles.isDone : ""}>
            {/*<NewCheckBox cheked={props.task.status === TaskStatuses.Completed}*/}
            {/*             type={"checkbox"}*/}
            {/*             callBack={changeStatusTask}*/}
            {/*/>*/}
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                onChange={changeStatusTask}
                color={'primary'}
            />
            <EditableItem title={props.task.title} changeTitleTask={changeTitleTask}/>
            <IconButton color={'inherit'} size={'small'} disableRipple onClick={() => props.onClickRemoveTaskHandler(props.task.id, props.todolistId)}><ClearIcon/></IconButton>

        </div>
    )
})
