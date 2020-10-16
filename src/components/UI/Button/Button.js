
import './Button.css';
import React from 'react';


const button = (props) => (
    <button className={"Button " +props.btnType} onClick={props.clicked} disabled={props.disabled}>
        {props.children}
    </button>
);

export default button