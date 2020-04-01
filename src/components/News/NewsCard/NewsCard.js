import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
        maxHeight: 200,
        minWidth:100,
        overflow: 'auto'
    },
    media: {
        height: 140,
    },
});

function DescriptionPart({text, handler = () => {}}) {
    if (text) {
        const description = `${text.slice(0, 40)}...`;
        return (<>{description}<Link size="small" color="primary" onClick={handler}>More > </Link></>);
    }
    return text;
}

export default function NewsCard(props) {
    const styles = useStyles();
    const {title, description, imageUrl, style, keyProp} = props;
    const history = useHistory();
    const cardHeader =
        <Typography gutterBottom>
            {title}
        </Typography>;

    const handler = (event) => {
        history.push('/top-news/detail', {title, description, imageUrl});
    };
    return (
        <Card className={styles.root} style={{...style}} key={keyProp}>
            <CardHeader title={cardHeader}/>
            <CardContent>
                <CardMedia
                    className = {styles.media}
                    image = {imageUrl}
                />
                <Typography gutterBottom>
                    <DescriptionPart
                        text={description}
                        handler={handler}
                    />
                </Typography>
            </CardContent>
        </Card>
    );
}