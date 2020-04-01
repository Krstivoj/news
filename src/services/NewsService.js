import httpClient from './HttpClient';

function loadNews(country,page = 1, pageSize = 100, q = '', category = '') {
    return httpClient.get('',{
        params :{
            country,
            page,
            pageSize,
            q,
            category
        }
    });
}

export async function loadEntertainment(country, page = 1, pageSize = 5){
    return loadNews(country, page, pageSize, '','entertainment');
}
export async function loadGeneral(country) {
    return loadNews(country);
}
export async function loadHealth(country, page = 1, pageSize = 5) {
    return loadNews(country, page, pageSize, '','health');
}
export async function loadScience(country, page = 1, pageSize = 5) {
    return loadNews(country, page, pageSize, '', 'science');
}
export async function loadSport(country, page = 1, pageSize = 5) {
    return loadNews(country, page, pageSize, '', 'sport');
}
export async function loadTechnology(country, page = 1, pageSize = 5) {
    return loadNews(country, page, pageSize, '', 'technology');
}
export async function loadEducation(country, page = 1, pageSize = 5) {
    return loadNews(country, page, pageSize, '', 'education');
}
export async function loadBusiness(country, page = 1, pageSize = 5) {
    return loadNews(country, page, pageSize, '', 'business');
}

export function prepareNews(news) {
    const {totalResults, articles} = news;
    const articlesPayload = articles.map(article => {
        return {
            title: article.title,
            description: article.description,
            urlToImage: article.urlToImage,
            content: article.content
        }
    });
    return {
        totalResults,
        articles: articlesPayload
    }
}