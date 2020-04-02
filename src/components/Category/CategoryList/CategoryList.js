import React, {useEffect, useState} from 'react';
import Category from "../Category/Category";
import NewsList from "../../News/NewsList/NewsList";
import './CategoryList.scss';

function CategoryList(props) {
    const [isCarousel, setCarousel] = useState(true);
    const [news, setNews] = useState([]);
    useEffect(() => {
    },[]);
    const handleCategoryDetails = (news) => {
        setNews(news);
        setCarousel(false);
    };
    return (
        isCarousel ? <div className={'category_container'}>
            <Category name={'Technology'} handler={handleCategoryDetails}/>
            <Category name={'Education'} handler={handleCategoryDetails}/>
            <Category name={'Science'} handler={handleCategoryDetails}/>
            <Category name={'Business'} handler={handleCategoryDetails}/>
            <Category name={'Sport'} handler={handleCategoryDetails}/>
        </div> : <NewsList articles={news}/>
    )
}
export default CategoryList;