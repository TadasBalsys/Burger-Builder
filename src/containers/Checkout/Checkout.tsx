import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { StoreState } from '../../store/reducer';

interface CheckoutProps extends RouteComponentProps {}

// TODO: Refactor to Function component (?)
class Checkout extends Component<CheckoutProps> {
  checkoutCancelHandler = () => this.props.history.goBack();

  checkoutContinueHandler = () =>
    this.props.history.replace('/checkout/contact-data');

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  ingredients: state.ingredients,
});

export default connect(mapStateToProps)(Checkout);
