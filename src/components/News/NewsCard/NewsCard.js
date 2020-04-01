import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";
import CardActions from "@material-ui/core/CardActions";
import './NewsCard.scss';

function DescriptionPart({text, handler = () => {}}) {
    if (text) {
        const description = `${text.slice(0, 40)}...`;
        return (<>{description}<Link size="small" color="primary" underline={'none'} onClick={handler}>More > </Link></>);
    }
    return text;
}

export default function NewsCard(props) {
    const {title, description, imageUrl, style, keyProp, className, use} = props;
    const rootClass = use ? `root_${use}` : 'root';
    const mediaClass = use ? `media_${use}` : 'media';
    const titleClass = use ? `title_${use}` : 'title';
    const history = useHistory();
    const cardHeader = <p className={titleClass}> {title} </p>;

    const handler = (event) => {
        history.push('/top-news/detail', {title, description, imageUrl});
    };
    return (
        <Card className={[rootClass, className].join(' ')} style={{...style}} key={keyProp}>
            <CardHeader title={cardHeader}/>
            <CardContent>
                <CardMedia
                    className = {mediaClass}
                    image = {imageUrl}
                />
            </CardContent>
            <CardActions>
                <Typography gutterBottom>
                    <DescriptionPart
                        text={description}
                        handler={handler}
                    />
                </Typography>
            </CardActions>
        </Card>
    );
}