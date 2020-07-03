import React from 'react';

import classes from './Input.module.css';
import {
  InputElementConfig,
  SelectElementConfig,
} from '../../../containers/Checkout/ContactData/ContactData';

interface InputProps {
  elementType: string;
  label?: string;
  elementConfig: SelectConfig | InputElementConfig;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SelectConfig {
  options: SelectElementConfig[];
}

const Input: React.FC<InputProps> = (props) => {
  let InputElement = undefined;

  // Type checker
  const isSelectInput = (
    input: SelectConfig | InputElementConfig
  ): input is SelectConfig => (input as SelectConfig).options !== undefined;

  switch (props.elementType) {
    case 'input':
      InputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          onChange={props.changeHandler}
        />
      );
      break;
    case 'textarea':
      InputElement = (
        <textarea className={classes.InputElement} {...props.elementConfig} />
      );
      break;
    case 'select':
      /* if isSelectInput returned boolean value is banded to variable and that variable is passed to if statement, 
      compiler will throw error - Property 'options' does not exist on type 'InputElementConfig' */

      // let isSelect = isSelectInput(props.elementConfig);
      if (isSelectInput(props.elementConfig))
        InputElement = (
          <select className={classes.InputElement}>
            {props.elementConfig.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        );
      break;
    default:
      InputElement = (
        <input className={classes.InputElement} {...props.elementConfig} />
      );
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
