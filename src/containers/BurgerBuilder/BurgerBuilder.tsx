import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import Burger, { Ingredients } from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';

import { StoreState } from '../../store/store';
import { fetchData } from '../../store/actions/burgerBuilderActions';
import { purchaseInit } from '../../store/actions/orderActions';

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  ingredients: Ingredients;
  totalPrice: number;
  hasIngredients: boolean;
  fetchError: boolean;
}

interface DispatchProps {
  fetchIngredients: () => void;
  purchaseInit: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

interface BurgerBuilderState {
  isPurchasable: boolean;
  purchasing: boolean;
  isLoading: boolean;
  // error: boolean;
}

class BurgerBuilder extends Component<Props, BurgerBuilderState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isPurchasable: false,
      purchasing: false,
      isLoading: false,
      // error: false,
    };
  }

  componentWillMount() {
    this.props.fetchIngredients();
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
    // TODO: Do I really need purchaseInit() method? Cause there is no visible difference with or without his method.
    this.props.purchaseInit();
    this.props.history.push('/checkout');
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
    let burgerSpinner = this.props.fetchError ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.hasIngredients) {
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

const mapStateToProps = (state: StoreState): StateProps => ({
  ingredients: state.burgerBuilderState.ingredients,
  totalPrice: state.burgerBuilderState.totalPrice,
  hasIngredients: state.burgerBuilderState.hasIngredients,
  fetchError: state.burgerBuilderState.fetchError,
});

const mapsDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  fetchIngredients: () => dispatch(fetchData()),
  purchaseInit: () => dispatch(purchaseInit()),
});

export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(withErrorHandler<Props>(BurgerBuilder, axios));
