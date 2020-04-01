import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import NewsCard from "../NewsCard/NewsCard";

function NewsDetails() {
    const location = useLocation();
    const history = useHistory();

    const goBack = () => {
        history.push('/top-news');
    };

    return (
        <div>
            <NewsCard
                title={location.state.title}
                description={location.state.description}
                imageUrl={location.state.imageUrl || 'alt'}
            />
            <Link size='small' color='primary' onClick={goBack}>
                Back to list </Link>
        </div>
    );
}

export default NewsDetails;
