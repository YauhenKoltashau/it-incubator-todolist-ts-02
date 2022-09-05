import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";
type editModeItemType = boolean
type EditableItemType = {
    title: string
    changeTitleTask: (title: string) => void
}
export const EditableItem = React.memo((props: EditableItemType) => {
    let[title, setTitle] = useState(props.title)
    let[editModeItem, setEditModeItem] = useState<editModeItemType>(false)
    const editModeActivate = () => {
        setEditModeItem(true)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }
    const modeViewActivate = () => {
      setEditModeItem(false)
        props.changeTitleTask(title)
    }

    return (
        editModeItem
            ? <TextField variant={'outlined'}  label={'name task'} value={title}  autoFocus onChange={onChangeHandler} onBlur={modeViewActivate}/>
            :<span onDoubleClick={editModeActivate} >{props.title}</span>

    )
})