import React from 'react';

import styles from './NavItem.module.css';

interface navItemProps {
  link: string;
  active?: boolean;
  children: string;
}

const navItem: React.FC<navItemProps> = ({ link, active, children }) => (
  <li className={styles.NavItem}>
    <a href={link} className={active ? styles.active : undefined}>
      {children}
    </a>
  </li>
);

export default navItem;
