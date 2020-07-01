import React from 'react';

import NavItemsList from '../NavItemsList/NavItemsList';
import Logo from '../../Logo/Logo';
import styles from './Toolbar.module.css';

const toolbar = () => (
  <header className={styles.Toolbar}>
    <div>MENU</div>
    <Logo />

    <nav>
      <NavItemsList />
    </nav>
  </header>
);

export default toolbar;
