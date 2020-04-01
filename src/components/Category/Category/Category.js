import {connect} from 'react-redux';
import React from 'react';
import {useHistory} from "react-router";
import {useState} from 'react';
import './Category.scss';
import NewsCard from "../../News/NewsCard/NewsCard";

const transform = [
    { transform: 'translateX(-20rem)', opacity: 0.5,  transition: '1.5s'},
    { transform: 'translateX(-10rem)', opacity: 0.75, transition: '1.5s'},
    { transform: 'translateX(0)',      opacity: 1,    transition: '1.5s'},
    { transform: 'translateX(10rem)',  opacity: 0.75, transition: '1.5s'},
    { transform: 'translateX(20rem)',  opacity: 0.5,  transition: '1.5s'}];

function PopulatedItems({currentIndex, articles}) {
    const items = [];
    let styleIndex = 0;
    for (let index = currentIndex; index < currentIndex + 5; index ++) {
        items.push(
            <NewsCard
                key={`slide-card-parent-${index}`}
                style={transform[styleIndex++]}
                keyProp={`slide-card-${index}`}
                title={articles[index].title}
                description={articles[index].description}
                content={articles[index].content}
                imageUrl={articles[index].urlToImage || 'alt'}
            />);
    }
    return items;
}

function Category(props) {
    const {articles} = props;
    console.log('ARTICLES', articles);
    const history = useHistory();
    const [currentIndex, setCurrentIndex] = useState(0);

    const backToList = () => {
        history.push('/top-news');
    };
    const nextNews = () => {
      if (currentIndex < articles.length - 3) {
          setCurrentIndex(currentIndex+1);
      }
    };
    const previousNews = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex-1);
        }
    };
    return (
        <>
        <div>
           <button onClick={backToList}>Go Back</button>
        </div>
            <div className="carousel-wrap">
                <div className="carousel-container">
                    <button className="carousel-btn prev-btn"
                            disabled={currentIndex < 1}
                            onClick={previousNews}
                    >
                        <i className="carousel-btn__arrow left" />
                    </button>
                    <div className="carousel-slide-list">
                        <PopulatedItems currentIndex={currentIndex} articles={articles}/>
                    </div>
                    <button className="carousel-btn next-btn"
                            onClick={nextNews}
                            disabled={currentIndex >= articles.length-3}>
                        <i className="carousel-btn__arrow right" />
                    </button>
                </div>
            </div>
    </>
    )
}

function mapStateToProps(state) {
    return {
        articles: state.articles
    };
}
export default connect(mapStateToProps, null)(Category);