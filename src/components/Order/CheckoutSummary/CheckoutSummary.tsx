import React from 'react';
import { connect } from 'react-redux';

import Burger, { Props as BurgerProps, Ingredients } from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import { StoreState } from '../../../store/store';

import classes from './CheckoutSummary.module.css';

//  Component Props

interface OwnProps extends BurgerProps {
  checkoutCancel: (e: React.MouseEvent) => void;
  checkoutContinue: (e: React.MouseEvent) => void;
}

interface StateProps {
  ingredients: Ingredients;
}

type Props = OwnProps & StateProps;

const CheckoutSummary: React.FC<Props> = ({
  ingredients,
  checkoutCancel,
  checkoutContinue,
}): JSX.Element => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it taste well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType='Danger' clickedHandler={checkoutCancel}>
        CANCEL
      </Button>
      <Button btnType='Success' clickedHandler={checkoutContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  ingredients: state.burgerBuilderState.ingredients,
});

export default connect(mapStateToProps)(CheckoutSummary);
