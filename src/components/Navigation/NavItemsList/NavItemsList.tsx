import React from 'react';

import NavItem from '../NavItem/NavItem';
import styles from './NavItemsList.module.css';

const navItemsList = () => (
  <ul className={styles.NavItems}>
    <NavItem link={'/'} active>
      Burger Builder
    </NavItem>
    <NavItem link={'/'}>Checkout</NavItem>
  </ul>
);

export default navItemsList;
