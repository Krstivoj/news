import React, {useState} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import {useRef} from 'react';
import './SearchComponent.scss';
import {loadNews, prepareNews} from "../../services/NewsService";
import NewsList from "../News/NewsList/NewsList";
import Loader from "../Loader/Loader";

function SearchField({submitHandler}) {
    const inputRef = useRef({});
    const handleEnterPress = (event) => {
        if (event.which === 13 || event.keyCode === 13) {
            submit();
        }
    };
    const submit = () => {
        const {value} = inputRef.current;
        submitHandler(value);
    };
    return (
        <>
            <div className='search_content'>Search top news from Great Britain by term:</div>
            <div className='search_container'>
                <div className={'search'}>
                    <div className={'search_icon'} onClick={submit}>
                        <SearchIcon/>
                    </div>
                    <input
                        placeholder="Search…"
                        className={'input_input input_root'}
                        onKeyPress={handleEnterPress}
                        ref={inputRef}
                    />
                </div>
            </div>
        </>
    )
}

export default function SearchComponent() {
    const [results, setResults] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isSubmitted, setSubmitted] = useState(false);

    const country = localStorage.getItem('country');
    const handleSearch = (value) => {
        const params = {
            country,
            pageSize: 100,
            q: value
        };
        setSubmitted(true);
        setLoading(true);
        loadNews(params).then(response => {
            const {articles} = prepareNews(response);
            setResults(articles);
            setLoading(false);
        });
    };
    return (
        <div className={'search_main'}>
            <SearchField submitHandler={handleSearch}/>
            { isSubmitted ? isLoading ? <Loader/> : <NewsList news={results}/> : <></>}
        </div>
    );
}