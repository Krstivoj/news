import React from 'react';
import {useState, useEffect} from 'react';

import './SwitchButton.scss';

export default function SwitchButton({disabled}) {
    const [checked, setChecked] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const classes = ['container'];
    if (disabled){
        classes.push('disabled');
    }
    useEffect(() => {
        const currentLang = localStorage.getItem('country');
        currentLang === 'gb' ? setChecked(false) : setChecked(true);
        setLoaded(true);
    }, []);

    const changeHandler = (country) => {
        localStorage.setItem('country', country);
        setChecked(!checked);
    };

    return(
        loaded && <div className={classes.join(' ')}>
            <input
                id="toggle-on"
                className="toggle toggle-left"
                name="toggle"
                value="true"
                type="radio"
                checked={!checked}
                onChange={() => changeHandler('gb')}
            />
            <label htmlFor="toggle-on" className="btn">GB</label>
            <input
                id="toggle-off"
                className="toggle toggle-right"
                name="toggle"
                value="false"
                type="radio"
                onChange={() => changeHandler('us')}
                checked={checked}
            />
            <label htmlFor="toggle-off" className="btn">US</label>
        </div>
    )
}