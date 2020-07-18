import React from 'react';

import classes from './Button.module.css';

interface Props {
  btnType: string;
  children: string;
  clickedHandler?: (e: React.MouseEvent) => void;
}

const Button: React.FC<Props> = ({ btnType, children, clickedHandler }) => (
  <button
    className={[classes.Button, classes[btnType]].join(' ')}
    onClick={clickedHandler}
  >
    {children}
  </button>
);

export default Button;
