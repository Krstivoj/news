import {connect} from 'react-redux';
import React from 'react';
import {useHistory} from "react-router";
import {useState} from 'react';
import './Category.scss';
import NewsCard from "../../News/NewsCard/NewsCard";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const transform = [
    { transform: 'translateX(-20rem)', opacity: 0.5,  transition: '1.5s', height: '260px', width: '200px'},
    { transform: 'translateX(-10rem)', opacity: 0.75, transition: '1.5s', height: '260px', width: '200px'},
    { transform: 'translateX(0)',      opacity: 1,    transition: '1.5s', height: '260px', width: '200px'},
    { transform: 'translateX(10rem)',  opacity: 0.75, transition: '1.5s', height: '260px', width: '200px'},
    { transform: 'translateX(20rem)',  opacity: 0.5,  transition: '1.5s', height: '260px', width: '200px'}];

function PopulatedItems({currentIndex, articles}) {
    const items = [];
    let styleIndex = 0;
    const history = useHistory();
    const goToDetails = (article) => {
        history.push('/top-news/detail', {...article});
    };
    for (let index = currentIndex; index < currentIndex + 5; index ++) {
        items.push(
            <div key={`details-nav-${index}`} onClick={() => goToDetails(articles[index])}>
                <NewsCard
                    key={`slide-card-parent-${index}`}
                    style={transform[styleIndex++]}
                    keyProp={`slide-card-${index}`}
                    title={articles[index].title}
                    description={articles[index].description}
                    content={articles[index].content}
                    imageUrl={articles[index].urlToImage}
                    use={'category'}
                /></div>);
    }
    return items;
}

function Category({articles, name}) {
    const [expanded, setExpanded] = useState(false);
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
    const handleExpansion = () => {
      setExpanded(!expanded);
    };
    const handleNavigation = () => {
        console.log('p tag is clicked');
    };
    return (
        <div className='category-main'>
            <div>
                <button onClick={backToList}>Go Back</button>
            </div>
            <ExpansionPanel expanded={expanded}>
                <ExpansionPanelSummary
                    onClick={handleExpansion}
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <div><p className={'link'} onClick={handleNavigation}>{name}</p></div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
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
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        articles: state.articles
    };
}
export default connect(mapStateToProps, null)(Category);