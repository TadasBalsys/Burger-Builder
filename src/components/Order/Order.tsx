import React from 'react';

import classes from './Order.module.css'

const Order = () => (
  <div className={classes.Order}>
    <p>Ingredients: List </p>
    <p>
      Price: <strong>props.price</strong>
    </p>
  </div>
);

export default Order;
