import React, {useEffect, useState} from "react";
import NewsCard from "../NewsCard/NewsCard";
import {connect} from 'react-redux';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import {loadNews, prepareNews} from "../../../services/NewsService";
import './NewsList.scss';
import Loader from "../../Loader/Loader";

const COUNTRIES = {
    gb: 'Great Britain',
    us: 'United States of America'
};
function PopulateNewsList({news, extra}) {
    const country = localStorage.getItem('country');
    return news && news.length ?
        <div className={'container'}>
            {extra && <p><span>&#8226;</span>Top {extra} news from {COUNTRIES[country]} </p> }
            <GridList cellHeight={250} className={'gridList'} cols={4}>
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

function NewsList({news, loadArticles, loadedArticles, extra}) {
    const [localNews, setLocalNews] = useState([]);
    const [isLoaded, setLoaded] = useState(false);
    useEffect(() => {
        if(news){
            setLocalNews(news);
            setLoaded(true);
        }
        else if (loadedArticles && loadedArticles.length) {
            setLocalNews(loadedArticles);
            setLoaded(true);
        } else {
            const country = localStorage.getItem('country');
            const payload = {
                country: country.toLowerCase(),
                pageSize: 100
            };
            loadNews(payload).then(response => {
                const {articles} = prepareNews(response);
                setLoaded(true);
                setLocalNews(articles);
                loadArticles(articles);
            });
        }
    }, [news]);

    return (
        <div className={'main-div'}>
            { isLoaded ? localNews ?
                <PopulateNewsList news={localNews} extra={extra}/> : <div>No News found</div> : <Loader/> }
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
