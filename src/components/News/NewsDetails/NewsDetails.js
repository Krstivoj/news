import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import NewsCard from "../NewsCard/NewsCard";
import './NewsDetails.scss';

function NewsDetails() {
    const location = useLocation();
    const history = useHistory();
    console.log(location);
    const goBack = () => {
        history.push('/top-news');
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignContent: 'center', width:'100%', height:'100%'}}>
            <NewsCard
                title={location.state.title}
                description={location.state.description}
                imageUrl={location.state.imageUrl || location.state.urlToImage}
                use={'detail'}
            />
            <Link size='small' color='primary' onClick={goBack}>
                Back to list </Link>
        </div>
    );
}

export default NewsDetails;
