import React, {useEffect, useState} from "react";
import NewsCard from "../NewsCard/NewsCard";
import {payload} from '../../../response';
import {connect} from 'react-redux';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: '100%',
        overflow: 'auto'
    },
    container: {
        overflowY: 'scroll',
        width: '100%',
        height: '100%',
        paddingBottom: '70px'
    }
}));
function PopulateNewsList({state}) {
    const classes = useStyles();
    return state ?
        <div className={classes.container}>
            <GridList cellHeight={250} className={classes.gridList} cols={4}>
                {state.articles.map((article, index) => (
                    <GridListTile key={`grid-list-tile-${index}`} cols={article.cols || 1}>
                        <NewsCard
                            key={`news-item-${index}`}
                            title={article.title}
                            description={article.description}
                            content={article.content}
                            imageUrl={article.urlToImage || 'alt'}
                            keyProp={`article-${index}`}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div> : <div> No news found</div>
}

function NewsList(props) {
    const [state, setState] = useState(null);
    const {loadArticles} = props;
    useEffect(() => {
        const mapped = payload.articles.map((article, index) => {
            return {
                ...article,
                id: index+1
            }
        });
        loadArticles(mapped);
        setState(payload);
    }, [loadArticles]);

    return (
        <div style={{paddingTop: '75px'}}>
            <PopulateNewsList state={state}/>
        </div>
    );
}

export function loadArticles(payload) {
    return { type: 'LOAD_ARTICLES', payload };
}

function mapDispatchToProps(dispatch) {
    return {
        loadArticles: articles => dispatch(loadArticles(articles))
    };
}

export default connect(null, mapDispatchToProps)(NewsList);
