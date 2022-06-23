import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {changedStatusTaskAC, changedTitleTaskAC} from "./tasks-reducer";
import styles from "./Todolist.module.css";
import {NewCheckBox} from "./components/CheckBox";
import {EditableItem} from "./EditableItem";
import {IconButton} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task:TaskType
    todolistId:string
    onClickRemoveTaskHandler:(taksId: string, todolistId: string)=>void
    checkboxHandler:(taskId:string,chekedValue: boolean, todoloistId: string)=>void
    changeTitleTask: (title: string,taskId: string)=>void
}
export const Task = React.memo((props:TaskPropsType) => {
const changeTitleTask = (title: string) => {
    props.changeTitleTask(title,props.task.id)
}
    return (
        <div className={props.task.isDone ? styles.isDone : ""}>
            <NewCheckBox isDone={props.task.isDone}
                         type={"checkbox"}
                         callBack={(checkedValue: boolean) => props.checkboxHandler(props.task.id, checkedValue, props.todolistId)}
            />
            <EditableItem title={props.task.title} changeTitleTask={changeTitleTask}/>
            <IconButton color={'inherit'} size={'small'} disableRipple onClick={() => props.onClickRemoveTaskHandler(props.task.id, props.todolistId)}><ClearIcon/></IconButton>

        </div>
    )
})
