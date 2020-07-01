import React from 'react';

import NavItemsList from '../NavItemsList/NavItemsList';
import Logo from '../../Logo/Logo';
import MenuIcon from '../MenuIcon/MenuIcon';

import classes from './Toolbar.module.css';

interface ToolbarProps {
  toggleHandler: (e: React.MouseEvent) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ toggleHandler }) => (
  <header className={classes.Toolbar}>
    <MenuIcon toggleHandler={toggleHandler} />
    <div className={classes.Logo}>
      <Logo />
    </div>

    <nav className={classes.Desktop}>
      <NavItemsList />
    </nav>
  </header>
);

export default Toolbar;
