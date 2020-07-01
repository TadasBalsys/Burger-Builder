import React from 'react';

import classes from './NavItem.module.css';

interface navItemProps {
  link: string;
  active?: boolean;
  children: string;
}

const navItem: React.FC<navItemProps> = ({ link, active, children }) => (
  <li className={classes.NavItem}>
    <a href={link} className={active ? classes.active : undefined}>
      {children}
    </a>
  </li>
);

export default navItem;