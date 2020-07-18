import React, { ReactNode } from 'react';

import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

interface Props {
  children: ReactNode | string;
  closeModalHandler: (e: React.MouseEvent) => void | undefined;
  show: boolean;
}

const modal: React.FC<Props> = ({show, closeModalHandler, children}) => (
  <>
    <Backdrop show={show} closeHandler={closeModalHandler} />
    <div
      className={classes.Modal}
      style={{
        transform: show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
      }}
    >
      {children}
    </div>
  </>
);

export default modal;
