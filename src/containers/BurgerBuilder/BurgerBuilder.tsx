import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Burger, { Ingredients } from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';

import { StoreState } from '../../store/reducer';

interface BurgerBuilderState {
  hasIngredients: boolean;
  isPurchasable: boolean;
  purchasing: boolean;
  isLoading: boolean;
  error: boolean;
}

interface BurgerBuilderProps extends RouteComponentProps {
  ingredients: Ingredients;
  totalPrice: number;
}

class BurgerBuilder extends Component<BurgerBuilderProps, BurgerBuilderState> {
  constructor(props: any) {
    super(props);

    this.state = {
      hasIngredients: false,
      isPurchasable: false,
      purchasing: false,
      isLoading: false,
      error: false,
    };
  }

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then((response) =>
        this.setState({
          hasIngredients: true,
        })
      )
      .catch((error) => this.setState({ error: true }));
  }

  checkIsPurchasable = () => {
    const ingredients = {
      ...this.props.ingredients,
    };
    const sum = Object.keys(ingredients)
      .map((ingredient) => {
        return ingredients[ingredient as keyof Ingredients];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  continuePurchaseHandler = () => {
    const queryParams = [];
    for (const key in this.props.ingredients) {
      queryParams.push(
        encodeURIComponent(key) +
          '=' +
          encodeURIComponent(this.props.ingredients[key])
      );
    }
    let price: number = +this.props.totalPrice.toFixed(2);
    queryParams.push('price=' + price);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString,
    });
  };

  purchaseHandler = () =>
    this.setState((prevState) => ({
      purchasing: !prevState.purchasing,
    }));

  render() {
    /*
    Loops thru ingredients and check if there is 0 of some ingredient,
    return boolean value, which is passed to down component three
    to lock down 'less' button in BuildControl component "Ingredients can't be -1, etc."
    */
    let isDisable: { [x: string]: boolean } = {};
    for (const key in this.props.ingredients) {
      let booleanValue: boolean =
        this.props.ingredients[key as keyof Ingredients] <= 0;
      isDisable = { ...isDisable, [key]: booleanValue };
    }
    let orderSummarySpinner = <Spinner />;
    let burgerSpinner = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.state.hasIngredients) {
      burgerSpinner = (
        <>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            price={this.props.totalPrice}
            disableInfo={isDisable}
            isPurchasable={this.checkIsPurchasable()}
            purchaseHandler={this.purchaseHandler}
          />
        </>
      );

      orderSummarySpinner = (
        <OrderSummary
          ingredients={this.props.ingredients}
          totalPrice={this.props.totalPrice}
          cancelOrder={this.purchaseHandler}
          continueOrder={this.continuePurchaseHandler}
        />
      );
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          closeModalHandler={this.purchaseHandler}
        >
          {orderSummarySpinner}
        </Modal>
        {burgerSpinner}
      </>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
});

export default connect(mapStateToProps)(withErrorHandler(BurgerBuilder, axios));
