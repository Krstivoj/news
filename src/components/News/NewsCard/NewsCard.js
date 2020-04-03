import React from 'react';
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";
import './NewsCard.scss';

function DescriptionPart({text, handler = () => {}, titleClass}) {
    if (text) {
        const description = `${text.slice(0, 25)}...`;
        return (
            <div className={titleClass}>
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
    const {title, description, imageUrl, use, content, style} = props;

    const rootClass = use ? `root_${use}` : 'root';
    const mediaClass = use ? `media_${use}` : 'media';
    const titleClass = use ? `title_${use}` : 'title';
    const headerClass = use ? `header_${use}` : 'header';
    const contentClass = use ? `content_${use}` : 'content';
    const gapClass = use ? `gap_${use}` : 'gap';

    const isDetails = use === 'detail';
    const history = useHistory();

    const handler = (event) => {
        event.preventDefault();
        history.push('/top-news/detail', {title, description, imageUrl, content});
    };
    return (
        <div className={rootClass} style={{...style}}>
            <div className={headerClass}>
                <p className={titleClass}> {title} </p>
            </div>
            <div className={gapClass}/>
            <div className={contentClass}>
                <img className={mediaClass} src={imageUrl} alt={'logo'}/></div>
            <div className={headerClass}>
                {
                    !isDetails ? <DescriptionPart
                        text={description}
                        handler={handler}
                        titleClass={titleClass}
                    /> :<> {description}</>
                }
            </div>
            {
                props.children
            }
        </div>

    );
}