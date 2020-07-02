import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Ingredients } from '../../components/Burger/Burger';

interface CheckoutSate {
  ingredients: Ingredients;
}

class Checkout extends Component<{}, CheckoutSate> {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
  };

  render() {
    return <div>
      <CheckoutSummary ingredients={this.state.ingredients}/>
    </div>;
  }
}

export default Checkout;