import React, {ChangeEvent} from "react";
import Checkbox from '@material-ui/core/Checkbox'
import {TaskStatuses} from "../../api/tasks-api";

type CheckBoxType = {
    checked: boolean
    type: string
    callBack: (value: boolean) => void
}

export const NewCheckBox = (props: CheckBoxType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return (
        <Checkbox
            checked={props.checked}
            onChange={onChangeHandler}
            size="small"
            inputProps={{ 'aria-label': 'secondary checkbox' }}

            />

    )
}