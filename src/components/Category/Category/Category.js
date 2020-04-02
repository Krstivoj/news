import {connect} from 'react-redux';
import React, {useEffect} from 'react';
import {useHistory} from "react-router";
import {useState} from 'react';
import './Category.scss';
import NewsCard from "../../News/NewsCard/NewsCard";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import {loadNews, prepareNews} from '../../../services/NewsService';
import Loader from "../../Loader/Loader";

const transform = [
    { transform: 'translateX(-16rem)', opacity: 0.5,  transition: '1.5s', height: '80%', justifyContent: 'center'},
    { transform: 'translateX(-8rem)',  opacity: 0.75, transition: '1.5s', height: '80%', justifyContent: 'center'},
    { transform: 'translateX(0)',      opacity: 1,    transition: '1.5s', height: '80%', justifyContent: 'center'},
    { transform: 'translateX(8rem)',   opacity: 0.75, transition: '1.5s', height: '80%', justifyContent: 'center'},
    { transform: 'translateX(16rem)',  opacity: 0.5,  transition: '1.5s', height: '80%', justifyContent: 'center'}];

function PopulatedItems({currentIndex, articles}) {
    const items = [];
    let styleIndex = 0;
    const history = useHistory();
    const style = {
        height: '100%',
        width: '100%',
        display: 'flex'
    };
    const goToDetails = (article) => {
        history.push('/top-news/detail', {...article});
    };
    for (let index = currentIndex; index < currentIndex + 5; index ++) {
        if (articles[index]) {
            items.push(
                <div style={style} key={`details-nav-${index}`} onClick={() => goToDetails(articles[index])}>
                    <NewsCard
                        key={`slide-card-parent-${index}`}
                        style={transform[styleIndex++]}
                        keyProp={`slide-card-${index}`}
                        title={articles[index].title}
                        description={articles[index].description}
                        content={articles[index].content}
                        imageUrl={articles[index].urlToImage}
                        use={'category'}
                    />
                </div>);
        } else {
            items.push(<div style={style} key={`details-nav-${index}`}/>)
        }
    }
    return items;
}

function Category({name, handler}) {
    const [expanded, setExpanded] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [news, setNews] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const country = localStorage.getItem('country');
        const payload = {
            country: country.toLowerCase(),
            pageSize: 6,
            category: name.toLowerCase(),
        };
        loadNews(payload).then(response => {
            const {articles} = prepareNews(response);
            setNews(articles);
            setLoading(false);
        });
    }, []);

    const nextNews = () => {
        if (currentIndex < news.length - 3) {
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
        setLoading(true);
        const country = localStorage.getItem('country');
        const payload = {
            country: country.toLowerCase(),
            pageSize: 100,
            category: name.toLowerCase(),
        };
        loadNews(payload).then(response => {
            const {articles} = prepareNews(response);
            handler(articles, name);
            setLoading(false);
        });
    };
    return (
       !isLoading ? <div className='category-main'>
            <ExpansionPanel expanded={expanded}>
                <ExpansionPanelSummary>
                    <div className={'expansion_panel'}>
                        <div className={'category_link'}><p className={'link'} onClick={handleNavigation}>{name}</p></div>
                        <div onClick={handleExpansion} className={'expand_icon'}><ExpandMoreIcon/></div>
                    </div>
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
                                <PopulatedItems currentIndex={currentIndex} articles={news}/>
                            </div>
                            <button className="carousel-btn next-btn"
                                    onClick={nextNews}
                                    disabled={currentIndex >= news.length-3}>
                                <i className="carousel-btn__arrow right" />
                            </button>
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
       </div> : <div className={'spinner-div'}><Loader/></div>
    )
}

function mapStateToProps(state) {
    return {
        articles: state.articles
    };
}
export default connect(mapStateToProps, null)(Category);