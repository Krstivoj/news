import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import {useRef} from 'react';
import './SearchComponent.scss';

function SearchField() {
    const inputRef = useRef({});
    const handleEnterPress = (event) => {
        if (event.which === 13 || event.keyCode === 13) {
            submit();
        }
    };
    const submit = () => {
        const {value} = inputRef.current;
        // send value
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
    return (
        <div className={'search_main'}>
            <SearchField/>
        </div>
    );
}