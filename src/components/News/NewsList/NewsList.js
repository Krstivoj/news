import React, {useEffect, useState} from "react";
import NewsCard from "../NewsCard/NewsCard";
import {connect} from 'react-redux';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {loadNews, prepareNews} from "../../../services/NewsService";

const useStyles = makeStyles((theme) => ({
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
function PopulateNewsList({news}) {
    const classes = useStyles();
    return news ?
        <div className={classes.container}>
            <GridList cellHeight={250} className={classes.gridList} cols={4}>
                {news.map((article, index) => (
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

function NewsList({news, loadArticles, loadedArticles}) {
    const [localNews, setLocalNews] = useState([]);
    useEffect(() => {
        if(news){
            setLocalNews(news);
        }
        else if (loadedArticles && loadedArticles.length) {
            setLocalNews(loadedArticles);
        } else {
            const country = localStorage.getItem('country');
            const payload = {
                country: country.toLowerCase(),
                pageSize: 100
            };
            loadNews(payload).then(response => {
                const {articles} = prepareNews(response);
                setLocalNews(articles);
                loadArticles(articles);
            });
        }
    }, []);

    return (
        <div style={{paddingTop: '75px'}}>
            { localNews ? <PopulateNewsList news={localNews}/> : <div>No News found</div> }
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
function mapStateToProps(state) {
    return {
        loadedArticles: state.articles
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
