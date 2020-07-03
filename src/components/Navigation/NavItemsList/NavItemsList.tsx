import React from 'react';

import NavItem from '../NavItem/NavItem';
import classes from './NavItemsList.module.css';

const navItemsList = () => (
  <ul className={classes.NavItems}>
    <NavItem exact link={'/'}>
      Burger Builder
    </NavItem>
    <NavItem link={'/orders'}>Order</NavItem>
  </ul>
);

export default navItemsList;
