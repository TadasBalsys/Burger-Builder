import React from 'react';

import classes from './Backdrop.module.css';

interface BackdropProps {
  show: boolean;
  closeHandler: (e: React.MouseEvent) => void;
}

const Backdrop: React.FC<BackdropProps> = ({ show, closeHandler }) =>
  show ? <div className={classes.Backdrop} onClick={closeHandler}></div> : null;

export default Backdrop;
