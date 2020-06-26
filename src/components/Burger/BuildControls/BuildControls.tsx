import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.css';

type control = {
  label: string;
  type: string;
};

const controls: control[] = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = () => (
  <div className={styles.BuildControls}>
    {controls.map(
      (control: control): JSX.Element =>  { 
        return (
        <BuildControl key={control.label} label={control.label} />
      )}
    )}
  </div>
);

export default buildControls;
