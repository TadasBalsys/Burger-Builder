import React from 'react';

import styles from './Button.module.css';

interface ButtonProps {
  btnType: string;
  children: string;
  clickedHandler: (e: React.MouseEvent) => void;
}

const Button: React.FC<ButtonProps> = ({
  btnType,
  children,
  clickedHandler,
}) => (
  <button
    className={[styles.Button, styles[btnType]].join(' ')}
    onClick={clickedHandler}
  >
    {children}
  </button>
);

export default Button;
