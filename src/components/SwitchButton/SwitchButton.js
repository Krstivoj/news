import React from 'react';
import {useState} from 'react';

import './SwitchButton.scss';

export default function SwitchButton({external}) {
    const [checked, setChecked] = useState(!!external);
    const changeHandler = () => {
        setChecked(!checked);
    };
    return(
        <>
            <input
                id="toggle-on"
                className="toggle toggle-left"
                name="toggle"
                value="true"
                type="radio"
                checked={!checked}
                onChange={changeHandler}
            />
            <label htmlFor="toggle-on" className="btn">GB</label>
            <input
                id="toggle-off"
                className="toggle toggle-right"
                name="toggle"
                value="false"
                type="radio"
                onChange={changeHandler}
                checked={checked}
            />
            <label htmlFor="toggle-off" className="btn">US</label>
        </>
    )
}