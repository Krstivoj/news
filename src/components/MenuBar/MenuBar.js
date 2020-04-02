import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SwitchButton from "../SwitchButton/SwitchButton";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    title: {
        paddingRight: '24px',
    },
    button: {
        position: 'absolute',
        right: 0
    },
    link: {
        cursor: 'pointer'
    }
}));

export default function MenuBar() {
    const classes = useStyles();
    const history = useHistory();
    const navigate = (path) => {
        history.push(path);
    };
    return (
        <div className={classes.root}>
            <AppBar position="fixed" color='secondary'>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <p onClick={() => navigate('/top-news')} className={classes.link}>Top News</p>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <p onClick={() => navigate('/categories')} className={classes.link}>Categories</p>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <p onClick={() => navigate('/search')} className={classes.link}>Search</p>
                    </Typography>
                    <div className={classes.button}>
                        <SwitchButton disabled={history.location.pathname.includes('/top-news/detail')}/>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}