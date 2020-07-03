import React from 'react';

import classes from './Order.module.css';

import { Ingredients } from '../Burger/Burger';

interface OrderProps {
  ingredients: Ingredients;
  totalPrice: number;
}

const Order: React.FC<OrderProps> = ({ totalPrice, ingredients }) => {
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
