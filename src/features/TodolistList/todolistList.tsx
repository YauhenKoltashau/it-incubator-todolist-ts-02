import React, {useCallback, useEffect} from "react";
import { useAppDispatch, useAppSelector} from "../../app/hooks";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm, AddItemFormSubmitHelperType} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {todolistsActions} from "./index";
import {useActions} from "../../utils/redux-utils";

type PropsType = {
    demo?: boolean
}
// export const addItemHandler = async (title:string,{...params}) => {
//         const dispatch = useAppDispatch()
//         const resultAction = await dispatch(asyncActions.addTodolistThunk({title}));
//         if (asyncActions.addTodolistThunk.rejected.match(resultAction)) {
//             if (resultAction.payload?.fieldsErrors?.length) {
//                 const errorMessage = resultAction.payload.fieldsErrors[0]
//                 throw new Error(errorMessage.error)
//             } else {
//                 throw new Error('Some error message')
//             }
//         }
//     }

export const TodolistList = React.memo(({demo = false}: PropsType) => {
    const todolists = useAppSelector(state => state.todolists)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()
    const {fetchTodolistsThunk} = useActions(todolistsActions)
    const addTodolistHandler = useCallback(async (title, helper: AddItemFormSubmitHelperType) => {
        const resultAction = await dispatch(todolistsActions.addTodolistThunk({title}));
        if (todolistsActions.addTodolistThunk.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length) {
                const errorMessage = resultAction.payload.errors[0]
                helper.setError(errorMessage)
            } else {
                helper.setError('Some error message')
            }
        } else {
            helper.setNewTask('')
        }
    }, [])


    useEffect(() => {
        if (!demo && isAuth) {
            fetchTodolistsThunk()
        }
    }, [])

    const todolistsForRender = todolists.map((tl) => {
        return (
            <div key={tl.id} style={{display: 'flex', margin: '10px'}}>
                <Grid container spacing={7} style={{display: 'flex'}}>
                    <Grid item key={tl.id}>
                        <Paper elevation={2} style={{
                            background: 'whitesmoke',
                            border: 0,
                            borderRadius: 3,
                            boxShadow: 'grey',
                            padding: '0 30px',
                            width: '300px'
                        }}>
                            <Todolist
                                todolist={tl}
                                key={tl.id}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    })
    if (!isAuth) {
        return <Navigate to='/login'/>
    }
    return (
        <Grid container style={{width: '100%'}}>
            <Grid item
                  style={{
                      display: 'flex',
                      overflowX: 'scroll',
                  }}>
                <Grid container style={{padding: '20px'}}>
                    <div
                        style={{
                            width: '300px'
                        }}>
                        <AddItemForm
                            addItem={addTodolistHandler}
                            name={'add todolist'}
                        />
                    </div>
                </Grid>
                {todolistsForRender}
            </Grid>
        </Grid>


    )

})