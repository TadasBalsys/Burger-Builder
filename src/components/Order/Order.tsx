import React from 'react';

import { Ingredients } from '../Burger/Burger';

import classes from './Order.module.css';

interface Props {
  ingredients: Ingredients;
  totalPrice: number;
}

const Order: React.FC<Props> = ({ totalPrice, ingredients }) => {
  const ingredientsArr = [];
  for (const ingredientName in ingredients) {
    ingredientsArr.push({
      name: ingredientName,
      amount: ingredients[ingredientName],
    });
  }

  const ingredientsJSXElemArr = ingredientsArr.map((ig) => (
    <span className={classes.Ingredient} key={ig.name}>
      {ig.name} - {ig.amount}
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsJSXElemArr} </p>
      <p>
        Price: <strong>{totalPrice}</strong>
      </p>
    </div>
  );
};

export default Order;
