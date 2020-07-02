import React from 'react';

import classes from './Button.module.css';

interface ButtonProps {
  btnType: string;
  children: string;
  clickedHandler?: (e: React.MouseEvent) => void;
}

const Button: React.FC<ButtonProps> = ({
  btnType,
  children,
  clickedHandler,
}) => (
  <button
    className={[classes.Button, classes[btnType]].join(' ')}
    onClick={clickedHandler}
  >
    {children}
  </button>
);

export default Button;
