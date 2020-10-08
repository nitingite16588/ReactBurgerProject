import React from 'react';
import './NavigationItems.css';
import  NavigationItem from './NavigationItem/NavigationItem'
const navigationItems=(props)=>(
 <ul className="NavigationItems">
     <NavigationItem href="/" active>Burger Builder</NavigationItem>
     <NavigationItem href="/">Checkout</NavigationItem>
 </ul>

)
export default navigationItems;