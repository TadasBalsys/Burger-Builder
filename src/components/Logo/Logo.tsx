import React from 'react';

import styles from './Logo.module.css'; 
import burgerLogo from '../../assets/burger-logo.png';

const logo = () => (
  <div className={styles.Logo}>
    <img src={burgerLogo} alt='MyBurger' />
  </div>
);

export default logo;
