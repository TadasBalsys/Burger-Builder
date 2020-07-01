import React from 'react';

import Button from '../../UI/Button/Button';
import { Ingredients } from '../../Burger/Burger';

interface OrderSummaryProps {
  ingredients: Ingredients;
  totalPrice: number;
  cancelOrder: (e: React.MouseEvent) => void;
  continueOrder: (e: React.MouseEvent) => void;
}

const orderSummary: React.FC<OrderSummaryProps> = ({
  ingredients,
  totalPrice,
  cancelOrder,
  continueOrder,
}) => {
  const ingredientsSummary: JSX.Element[] = Object.keys(ingredients).map(
    (igKey: string, i: number) => (
      <li key={i}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
      </li>
    )
  );

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total Price: {totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType={'Danger'} clickedHandler={cancelOrder}>
        Cancel
      </Button>
      <Button btnType={'Success'} clickedHandler={continueOrder}>
        Continue
      </Button>
    </>
  );
};

export default orderSummary;
