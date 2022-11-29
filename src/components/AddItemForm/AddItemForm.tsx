import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import {Button, TextField} from "@material-ui/core";
import BlockIcon from '@material-ui/icons/Block';

export type AddItemFormSubmitHelperType = {
    setError :(error: string) => void, setNewTask:(title: string) => void
}

type AddItemFormType = {
    addItem: (title: string, helper:AddItemFormSubmitHelperType) => void
    name: string
    disabled?: boolean
    serverError?: string | null
}

export const AddItemForm = React.memo(({addItem, disabled = false, serverError, ...props}: AddItemFormType) => {
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
            onClickAddItemHandler()
        }

    }
    const onClickAddItemHandler = async () => {
        if (newTask.trim() !== "") {
            addItem(newTask.trim(), {setNewTask, setError})
            // try {
            //     await addItem(newTask.trim())
            //     setNewTask("")
            // } catch (error: any) {
            //     setError(error.message)
            // }

        } else {
            setError("Title is required")
        }


    }
    return (
        <div>
            <TextField
                disabled={disabled}
                label={"title"}
                variant={"outlined"}
                value={newTask}
                onChange={onChangeButtonHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
            />
            {newTask ?
                <Button
                    style={{marginLeft: '5px', marginTop: '10px'}}
                    disabled={disabled}
                    size={'small'}
                    variant={'text'}
                    color={'primary'}
                    onClick={onClickAddItemHandler}>
                    <AddIcon
                        color={'inherit'}
                        fontSize={'small'}
                    /></Button> : <Button
                    style={{marginLeft: '5px', marginTop: '10px'}}
                    disabled={disabled}
                    variant={'contained'}
                    onClick={onClickAddItemHandler}
                ><BlockIcon/></Button>}
            {error&&<div style={{color: 'red'}}>{error}</div>}

        </div>

    )
})