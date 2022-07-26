import React, {ChangeEvent, KeyboardEvent, MouseEventHandler, useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import {Button, TextField} from "@material-ui/core";
import BlockIcon from '@material-ui/icons/Block';
import {UniButton} from "./Button";


type AddItemFormType = {
    addItem: (title: string) => void
    name: string
    disabled?:boolean
}

export const AddItemForm = React.memo(({addItem,disabled=false,...props}: AddItemFormType) => {
    const [newTask, setNewTask] = useState('')
    let [error, setError] = useState<string | null>(null)
    const onChangeButtonHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            onClickAddTaskHandler()
        }

    }
    const onClickAddTaskHandler = () => {
        if (newTask.trim() !== "") {
            addItem(newTask.trim())
            setNewTask("")
        } else {
            setError("Title is required")
        }


    }
    return (
        <div>
            <TextField
                disabled={disabled}
                label={error ? error : "new name"}
                variant={"outlined"}
                value={newTask}
                onChange={onChangeButtonHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}


            />

            {newTask ?
                <Button
                    disabled={disabled}
                    size={'small'}
                    variant={'text'}
                    color={'primary'}
                    onClick={onClickAddTaskHandler}>
                    <AddIcon
                        color={'inherit'}
                        fontSize={'small'}
                    /></Button> : <Button
                    disabled={disabled}
                    variant={'contained'}
                    onClick={onClickAddTaskHandler}
                ><BlockIcon/></Button>}


        </div>

    )
})