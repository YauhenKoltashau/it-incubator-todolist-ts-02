import React from "react";

import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "./stories/src/api/tasks-api";

export default {
    title: 'Task',
    component: Task
}
const RemoveTaskCallBack = action("Task removed")
const changeTitleCallBack = action("Title changed")
const checkboxCallBack = action("Chexbox changed")
export const TestAddItemForm = () => {
    return(
        <>
            <Task
                task={{id: '1', title: 'CSS',status:TaskStatuses.Completed, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:TaskPriorities.Low,todoListId:"todolistId1"}}
                todolistId={"todolistId1"}
                onClickRemoveTaskHandler={RemoveTaskCallBack}
                changeTitleTask={changeTitleCallBack}
                checkboxHandler={checkboxCallBack}
            />
            <Task
                task={{id: '1', title: 'JS', status:TaskStatuses.Completed, addedDate:'', startDate:'',order: 1,deadline: '', description: '', priority:TaskPriorities.Low,todoListId:"todolistId1"}}
                todolistId={"todolistId2"}
                onClickRemoveTaskHandler={RemoveTaskCallBack}
                changeTitleTask={changeTitleCallBack}
                checkboxHandler={checkboxCallBack}
            />
        </>

    )
}