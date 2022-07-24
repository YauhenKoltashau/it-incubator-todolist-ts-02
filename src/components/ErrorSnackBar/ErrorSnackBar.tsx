import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {useAppDispatch, useAppSelector} from "../../stories/src/app/hooks";
import {setAppErrorAC} from "../../app-reducer";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export function ErrorSnackbar() {
    const dispatch = useAppDispatch()
    const error = useAppSelector(state => state.app.error)
    const [open, setOpen] = React.useState(false);


    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppErrorAC(null));
    };


    return (
            <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>

    );
}