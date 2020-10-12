import React from 'react';
import './NavigationItem.css';
import {NavLink} from 'react-router-dom'

const navigationItem = (props) => (
    <li className="NavigationItem">
        <NavLink
        exact
        activeClassName="active"
            to={props.link}>{props.children}
        </NavLink>
    </li>

)
export default navigationItem;