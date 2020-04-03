import httpClient from './HttpClient';

export function loadNews(params) {
    return httpClient.get('',{
        params
    });
}

export function prepareNews(news) {
    const {totalResults, articles} = news;
    const articlesPayload = articles.map(article => {
        return {
            title: article.title,
            description: article.description,
            urlToImage: article.urlToImage
        }
    });
    return {
        totalResults,
        articles: articlesPayload
    }
}