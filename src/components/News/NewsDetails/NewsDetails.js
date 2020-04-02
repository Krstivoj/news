import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import NewsCard from '../NewsCard/NewsCard';
import './NewsDetails.scss';

function NewsDetails() {
    const location = useLocation();
    const history = useHistory();
    const goBack = () => {
        history.push('/top-news');
    };

    return (
        <div className='main'>
            <NewsCard
                title={location.state.title}
                description={location.state.description}
                imageUrl={location.state.imageUrl || location.state.urlToImage}
                use={'detail'}
                content={location.state.content}
            >
                <div className={'link_back'}>
                    <Link
                        size='small'
                        color='primary'
                        onClick={goBack}
                    >
                        Back to list
                    </Link>
                </div>
            </NewsCard>
        </div>
    );
}

export default NewsDetails;
