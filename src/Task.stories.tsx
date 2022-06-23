import React from "react";

import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

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
                task={{id: '1', title: 'CSS', isDone: true}}
                todolistId={"todolistId1"}
                onClickRemoveTaskHandler={RemoveTaskCallBack}
                changeTitleTask={changeTitleCallBack}
                checkboxHandler={checkboxCallBack}
            />
            <Task
                task={{id: '1', title: 'JS', isDone: false}}
                todolistId={"todolistId2"}
                onClickRemoveTaskHandler={RemoveTaskCallBack}
                changeTitleTask={changeTitleCallBack}
                checkboxHandler={checkboxCallBack}
            />
        </>

    )
}