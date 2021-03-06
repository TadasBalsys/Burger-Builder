import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavItem.module.css';

interface Props {
  link: string;
  exact?: boolean;
  children: string;
}

const navItem: React.FC<Props> = ({ link, exact, children }) => (
  <li className={classes.NavItem}>
    <NavLink to={link} activeClassName={classes.active} exact={exact}>
      {children}
    </NavLink>
  </li>
);

export default navItem;
