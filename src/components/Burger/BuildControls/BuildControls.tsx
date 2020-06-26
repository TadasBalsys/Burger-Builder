import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.css';

interface BuildControlProps {
  disableInfo: { [x: string]: boolean };
  ingredientsAdded: Function;
  ingredientsRemoved: Function;
}

interface isIngredientDisable {
  salad: boolean;
  cheese: boolean;
  meat: boolean;
  bacon: boolean;
}

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

const buildControls: React.FC<BuildControlProps> = ({
  disableInfo,
  ingredientsAdded,
  ingredientsRemoved,
}): JSX.Element => (
  <div className={styles.BuildControls}>
    {controls.map(
      (control: control): JSX.Element => {
        const { label, type } = control;
        return (
          <BuildControl
            key={label}
            label={label}
            add={() => ingredientsAdded(type)}
            remove={() => ingredientsRemoved(type)}
            disable={disableInfo[type as keyof isIngredientDisable]}
          />
        );
      }
    )}
  </div>
);

export default buildControls;
