import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.css';

interface BuildControlProps {
  price: number;
  isPurchasable: boolean;
  disableInfo: { [x: string]: boolean };
  ingredientsAdded: Function;
  ingredientsRemoved: Function;
  purchaseHandler: (e: React.MouseEvent) => void;
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

const buildControls: React.FC<BuildControlProps> = (props): JSX.Element => {
  const {
    price,
    isPurchasable,
    disableInfo,
    ingredientsAdded,
    ingredientsRemoved,
    purchaseHandler
  } = props;

  return (
    <div className={styles.BuildControls}>
      <p>
        Current Price: <strong>{price.toFixed(2)}</strong>
      </p>
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
      <button
        className={styles.OrderButton}
        disabled={!isPurchasable}
        onClick={purchaseHandler}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
