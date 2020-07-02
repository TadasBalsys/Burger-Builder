import React from 'react';

import Burger, { BurgerProps } from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

interface CheckoutSummary extends BurgerProps {
  checkoutCancel: (e: React.MouseEvent) => void;
  checkoutContinue: (e: React.MouseEvent) => void;
}

const CheckoutSummary: React.FC<CheckoutSummary> = ({
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
      <Button btnType='Success' clickedHandler={checkoutContinue }>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
