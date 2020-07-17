import React from 'react';
import { Dispatch } from 'redux'
import { connect } from 'react-redux';

import BuildControl from './BuildControl/BuildControl';

import { addIngredient, removeIngredient } from '../../../store/actions';

import { BurgerBuilderActions } from '../../../store/actions/burgerBuilderActions';

import classes from './BuildControls.module.css';

interface BuildControlProps {
  price: number;
  disableInfo: { [x: string]: boolean };
  isPurchasable: boolean;
  onIngrAdd: (ingrName: string) => void;
  onIngrRemove: (ingrName: string) => void;
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
    onIngrAdd,
    onIngrRemove,
    purchaseHandler,
  } = props;

  return (
    <div className={classes.BuildControls}>
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
              add={() => onIngrAdd(type)}
              remove={() => onIngrRemove(type)}
              disable={disableInfo[type as keyof isIngredientDisable]}
            />
          );
        }
      )}
      <button
        className={classes.OrderButton}
        disabled={!isPurchasable}
        onClick={purchaseHandler}
      >
        ORDER NOW
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<BurgerBuilderActions>) => {
  return {
    onIngrAdd: (ingrName: string) => dispatch(addIngredient(ingrName)),
    onIngrRemove: (ingrName: string) => dispatch(removeIngredient(ingrName)),
  };
};

export default connect(null, mapDispatchToProps)(buildControls);
