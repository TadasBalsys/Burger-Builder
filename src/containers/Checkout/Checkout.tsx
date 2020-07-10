import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { StoreState } from '../../store/store';
import { Ingredients } from '../../components/Burger/Burger';

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  ingredients: Ingredients;
}

type Props = OwnProps & StateProps;

// TODO: Refactor to Function component (?)
class Checkout extends Component<Props> {
  //TODO: When order is canceled and app goBack to previous page, the totalPrice is not reset
  checkoutCancelHandler = () => this.props.history.goBack();

  checkoutContinueHandler = () =>
    this.props.history.replace('/checkout/contact-data');

  render() {
    let summary = <Redirect to='/' />;
    const hasIngredients = Object.keys(this.props.ingredients).length;
    if (hasIngredients) {
      summary = (
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

    return summary;
  }
}

const mapStateToProps = (state: StoreState) => ({
  ingredients: state.ingredients,
});

export default connect(mapStateToProps)(Checkout);
