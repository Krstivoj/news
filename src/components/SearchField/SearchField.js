import {fade, makeStyles} from "@material-ui/core/styles";
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '50%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: '50%',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '50%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    content: {
        display: 'flex',
        justifyItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '8px 24px'
    },
    main: {
        flexGrow: 1,
        paddingTop: '70px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchContainer: {
        width: '100%',
        justifyContent: 'center',
        justifyItems: 'center',
        display: 'flex'
    }
}));
export default function SearchField() {
    const classes = useStyles();
    const handler = () => {
        console.log('Search button clicked.');
    };
    return (
        <div className={classes.main}>
            <div className={classes.content}>Search top news from Great Britain by term:</div>
            <div className={classes.searchContainer}>
                <div className={classes.search}>
                    <div className={classes.searchIcon} onClick={handler}>
                        <SearchIcon/>
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
            </div>
        </div>
    )
}