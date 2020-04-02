import React from 'react';
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";
import './NewsCard.scss';

function DescriptionPart({text, handler = () => {}}) {
    if (text) {
        const description = `${text.slice(0, 25)}...`;
        return (
            <div className={'title'}>
                {description}
                <Link
                    size="small"
                    color="primary"
                    underline={'none'}
                    className={'link_news'}
                    onClick={handler}
                >
                    {`More >`}
                </Link>
            </div>);
    }
    return text;
}

export default function NewsCard(props) {
    const {title, description, imageUrl, use} = props;
    const rootClass = use ? `root_${use}` : 'root';
    const mediaClass = use ? `media_${use}` : 'media';
    const titleClass = use ? `title_${use}` : 'title';
    const history = useHistory();

    const handler = (event) => {
        event.preventDefault();
        history.push('/top-news/detail', {title, description, imageUrl});
    };
    return (
        <div className={rootClass}>
            <div className={'header'}>
                <p className={titleClass}> {title} </p>
            </div>
            <div className={'gap'}/>
            <div className={'content'}>
                <img className={mediaClass} src={imageUrl} alt={'logo'}/></div>
            <div className={'header'}>
                <DescriptionPart
                    text={description}
                    handler={handler}
                />
            </div>
        </div>

    );
}