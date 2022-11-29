import {AppBar, Button, Grid, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import React from "react";
import {useAppSelector} from "../../app/hooks";
import {useActions} from "../../utils/redux-utils";
import {loginActions} from "../../features/Login";

export const Header = () => {
    const appStatus = useAppSelector(state => state.app.status)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const nikName = useAppSelector(state => state.auth.login)
    const {LogoutThunk} = useActions(loginActions)
    const LogoutHandler = () => {
       LogoutThunk({})
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