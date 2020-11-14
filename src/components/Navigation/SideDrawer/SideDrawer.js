import React from 'react';
import './SideDrawer.css';
import NavigationItem from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo'
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
let attachedClasse="SideDrawer Close";
if(props.open) {
    attachedClasse="SideDrawer Open";
}

    return( 
    <Aux>
    <div className={attachedClasse}> 
   
        <Backdrop show={props.open}  clicked={props.closed}/>
        <Logo  height="11%" />
       
        <nav>
            <NavigationItem  isAuthenticated={props.isAuth} >Burger Builder</NavigationItem>
        </nav>
        </div>
    </Aux>
    )
    

}
export default sideDrawer;