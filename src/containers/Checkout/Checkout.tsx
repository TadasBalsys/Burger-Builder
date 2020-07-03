import React, { Component } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { Ingredients } from '../../components/Burger/Burger';

interface CheckoutProps extends RouteComponentProps {}

export interface CheckoutState {
  ingredients: Ingredients;
  totalPrice: number;
}

class Checkout extends Component<CheckoutProps, CheckoutState> {
  state = {
    ingredients: {} as Ingredients,
    totalPrice: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients: { [key: string]: number } = {};
    let price = 0;
    for (const param of query.entries()) {
      if (param[0] === 'price') {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalPrice: price });
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
        <Route
          path={this.props.match.path + '/contact-data'}
          component={() => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
