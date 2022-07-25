import {AppBar, Button, Grid, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {LogoutThunk} from "../../features/Login/login-reducer";

export const Header = () => {
    const appStatus = useAppSelector(state => state.app.status)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const nikName = useAppSelector(state => state.auth.login)
    const dispatch = useAppDispatch()
    const LogoutHandler = () => {
       dispatch(LogoutThunk())
    }
    return(
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                {isAuth
                    ?<Grid container justifyContent={'flex-end'}>
                        <Grid item>
                            {nikName}
                        </Grid>
                        <Grid item>
                            <Button color="primary" variant={'contained'} onClick={LogoutHandler}>Logout</Button>
                        </Grid>
                    </Grid>
                    :""
                }

            </Toolbar>
            {appStatus === 'loading' && <LinearProgress/>}

        </AppBar>
    )
}