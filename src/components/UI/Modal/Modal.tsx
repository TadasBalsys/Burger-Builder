import React, { ReactNode } from 'react';

import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

interface ModalProps {
  children: ReactNode | string;
  closeModalHandler: (e: React.MouseEvent) => void | undefined;
  show: boolean;
}

const modal: React.FC<ModalProps> = (props) => (
  <>
    <Backdrop show={props.show} closeHandler={props.closeModalHandler} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0',
      }}
    >
      {props.children}
    </div>
  </>
);

export default modal;
