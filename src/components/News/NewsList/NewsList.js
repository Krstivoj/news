import React, {useEffect, useState} from "react";
import NewsCard from "../NewsCard/NewsCard";
import {payload} from '../../../response';
import {connect} from 'react-redux';

function PopulateNewsList({state}) {
    return state ?
        <div> {
            state.articles.map((article, index) => {
                return <div style={{padding: '16px'}} key={`news-div-${index}`}><NewsCard
                    title={article.title}
                    description={article.description}
                    content={article.content}
                    imageUrl={article.urlToImage || 'alt'}
                    keyProp={`article-${index}`}
                /></div>
            })
        }
        </div>: <div> No news found</div>
}

function NewsList(props) {
    const [state, setState] = useState(null);
    const {loadArticles} = props;
    console.log('Da li je fja', typeof loadArticles);

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
        <div>
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
