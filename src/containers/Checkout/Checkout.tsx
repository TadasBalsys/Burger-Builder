import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Ingredients } from '../../components/Burger/Burger';

interface CheckoutProps extends RouteComponentProps {}

interface CheckoutSate {
  ingredients: Ingredients;
}

class Checkout extends Component<CheckoutProps, CheckoutSate> {
  state = {
    ingredients: {} as Ingredients,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients: { [key: string]: number } = {};
    for (const param of query.entries()) {
      ingredients[param[0]] = +param[1];
    }
    this.setState({ ingredients: ingredients });
  }

  checkoutCancelHandler = () => this.props.history.goBack();

  checkoutContinueHandler = () =>
    this.props.history.replace('/checkout/contact-data');

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
        />
      </div>
    );
  }
}

export default Checkout;
