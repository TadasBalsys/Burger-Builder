import React from 'react';

import classes from './Input.module.css';

interface InputProps {
  input_type: string;
  label?: string;
  placeholder: string
}

const Input: React.FC<InputProps> = (props) => {
  let InputElement = undefined;

  switch (props.input_type) {
    case 'input':
      InputElement = <input className={classes.InputElement} {...props} />;
      break;
    case 'textarea':
      InputElement = <textarea className={classes.InputElement} {...props} />;
      break;
    default:
      InputElement = <input className={classes.InputElement} {...props} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label} htmlFor=''>
        {props.label}
      </label>
      {InputElement}
    </div>
  );
};

export default Input;
