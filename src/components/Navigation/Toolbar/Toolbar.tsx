import React from 'react';

import NavItemsList from '../NavItemsList/NavItemsList';
import Logo from '../../UI/Logo/Logo';
import MenuIcon from '../MenuIcon/MenuIcon';

import classes from './Toolbar.module.css';

interface Props {
  toggleHandler: (e: React.MouseEvent) => void;
}

const Toolbar: React.FC<Props> = ({ toggleHandler }) => (
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
