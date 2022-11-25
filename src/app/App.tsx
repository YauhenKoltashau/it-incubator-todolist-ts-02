import React, {useEffect} from 'react';
import './App.css';
import {CircularProgress, Container, Grid} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "./hooks";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {asyncActions} from "./index";
import {Header} from "../components/Header/Header";
import {RoutesBlock} from "../components/RoutesBlock/RoutesBlock";
import {selectIsInitialized} from "./selectors";


type PropsType = {
    demo?: boolean
}


const App = React.memo(function ({demo = false}: PropsType) {
    const initializeState = useAppSelector(selectIsInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        !demo&&
        dispatch(asyncActions.initializeAppThunk())
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
        <div className="App" >
            <ErrorSnackbar/>
            <Header/>

            <div>
                {/*<Routes>*/}
                {/*    <Route path={'/'} element={<TodolistList demo={demo}/>}/>*/}
                {/*    <Route path={'/login'} element={<Login/>}/>*/}
                {/*</Routes>*/}
                <RoutesBlock demo={demo}/>
            </div>

        </div>
    );
})

export default App;