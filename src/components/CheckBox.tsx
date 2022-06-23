import React, {ChangeEvent} from "react";
import Checkbox from '@material-ui/core/Checkbox'

type CheckBoxType = {
    isDone: boolean
    type: string
    callBack: (checkedValue: boolean) => void
}

export const NewCheckBox = (props: CheckBoxType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return (
        <Checkbox
            checked={props.isDone}
            onChange={onChangeHandler}
            size="small"
            inputProps={{ 'aria-label': 'secondary checkbox' }}

            />

    )
}