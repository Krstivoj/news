import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SwitchButton from "../SwitchButton/SwitchButton";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex'
    },
    title: {
        paddingRight: '24px',
    },
    button: {
        position: 'absolute',
        right: 0
    }
}));

export default function MenuBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link  color='inherit' className={classes.title} href={'/top-news'}
                               underline={'none'}>
                            Top News </Link>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Link  color='inherit' className={classes.title} href={'/categories'}
                               underline={'none'}>
                            Categories </Link>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Link  color='inherit' className={classes.title} href={'/search'}
                               underline={'none'}>
                            Search </Link>
                    </Typography>
                    <div className={classes.button}>
                        <SwitchButton/>
                    </div>
                    {/*<Button color="inherit" className={classes.button}>Login</Button>*/}
                </Toolbar>
            </AppBar>
        </div>
    );
}