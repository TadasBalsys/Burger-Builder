import React from 'react';

import Logo from '../../Logo/Logo';
import styles from './Toolbar.module.css';

const toolbar = () => (
  <header className={styles.Toolbar}>
    <div>MENU</div>
    <Logo />

    <nav>...\</nav>
  </header>
);

export default toolbar;
