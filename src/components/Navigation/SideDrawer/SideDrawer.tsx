import React from 'react';

import Logo from '../../UI/Logo/Logo';
import NavItemsList from '../NavItemsList/NavItemsList';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './SideDrawer.module.css';

interface Props {
  show: boolean;
  closeHandler: (e: React.MouseEvent) => void;
}

const SideDrawer: React.FC<Props> = ({ show, closeHandler }) => {
  let attachedClasses: string = [classes.SideDrawer, classes.Close].join(' ');
  if (show) {
    attachedClasses = [classes.SideDrawer, classes.Open].join(' ');
  }

  return (
    <>
      <Backdrop show={show} closeHandler={closeHandler} />
      <div className={attachedClasses}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItemsList />
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
