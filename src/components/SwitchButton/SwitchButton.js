import React from 'react';
import {useState, useEffect} from 'react';

import './SwitchButton.scss';

export default function SwitchButton({disabled}) {
    const [checked, setChecked] = useState(false);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const currentLang = localStorage.getItem('currentLang');
        currentLang === 'GB' ? setChecked(false) : setChecked(true);
        setLoaded(true);
    }, []);
    const changeHandler = (lang) => {
        localStorage.setItem('currentLang', lang);
        setChecked(!checked);
    };
    return(
        loaded && <>
            <input
                id="toggle-on"
                className="toggle toggle-left"
                name="toggle"
                value="true"
                type="radio"
                checked={!checked}
                onChange={() => changeHandler('GB')}
                disabled={disabled}
            />
            <label htmlFor="toggle-on" className="btn">GB</label>
            <input
                id="toggle-off"
                className="toggle toggle-right"
                name="toggle"
                value="false"
                type="radio"
                onChange={() => changeHandler('US')}
                checked={checked}
                disabled={disabled}
            />
            <label htmlFor="toggle-off" className="btn">US</label>
        </>
    )
}