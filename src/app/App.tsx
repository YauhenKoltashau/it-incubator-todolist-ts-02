import React, {useEffect} from 'react';
import './App.css';
import {CircularProgress, Container, Grid} from "@material-ui/core";
import {Route, Routes} from "react-router-dom";
import {TaskType} from "../api/tasks-api";
import {useAppDispatch, useAppSelector} from "./hooks";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";

import {Login} from "../features/Login/Login";
import {TodolistList} from "../features/TodolistList/todolistList";
import {initializeAppThunk} from "./app-reducer";
import {Header} from "../components/Header/Header";


type PropsType = {
    demo?: boolean
}

const App = React.memo(function ({demo = false}: PropsType) {
    console.log('AppWR is render')

    const initializeState = useAppSelector(state => state.app.isInitialized)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppThunk())
    }, [])

    if (!initializeState) {
        return (
            <Grid container justifyContent={'center'}>
                <Grid item>
                    <CircularProgress size={100}/>
                </Grid>
            </Grid>)
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <Header/>

            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>

                </Routes>
            </Container>

        </div>
    );
})

export default App;
