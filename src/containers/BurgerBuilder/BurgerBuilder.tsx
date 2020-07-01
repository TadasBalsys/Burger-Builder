import React, { Component } from 'react';

import Burger, { Ingredients } from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';

interface BurgerBuilderState {
  ingredients: Ingredients;
  isPurchasable: boolean;
  purchasing: boolean;
  totalPrice: number;
  isLoading: boolean;
}

const IngredientsPrices = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component<{}, BurgerBuilderState> {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    isPurchasable: false,
    purchasing: false,
    totalPrice: 0,
    isLoading: false,
  };

  addIngredientHandler = (type: string): void => {
    const oldCount: number = this.state.ingredients[type as keyof Ingredients];
    const updatedIngredients: Ingredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type as keyof Ingredients] = oldCount + 1;
    const priceAddition: number = IngredientsPrices[type as keyof Ingredients];
    const newPrice: number = this.state.totalPrice + priceAddition;
    return this.setState(
      () => ({
        totalPrice: newPrice,
        ingredients: updatedIngredients,
      }),
      () => this.updatePurchaseState()
    );
  };

  removeIngredientHandler = (type: string): void => {
    const oldCount: number = this.state.ingredients[type as keyof Ingredients];
    if (oldCount <= 0) return;
    const updatedIngredients: Ingredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type as keyof Ingredients] = oldCount - 1; // This ONE
    const priceAddition: number = IngredientsPrices[type as keyof Ingredients];
    const newPrice: number = this.state.totalPrice - priceAddition; // This One
    return this.setState(
      () => ({
        totalPrice: newPrice,
        ingredients: updatedIngredients,
      }),
      () => this.updatePurchaseState()
    );
  };

  updatePurchaseState = () => {
    const ingredients = {
      ...this.state.ingredients,
    };
    const sum = Object.keys(ingredients)
      .map((ingredient) => {
        return ingredients[ingredient as keyof Ingredients];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return this.setState({ isPurchasable: sum > 0 });
  };

  continuePurchaseHandler = () => {
    this.setState({ isLoading: true });
    const order = {
      ingredient: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Tadas Balsys',
        address: {
          street: 'Test str. 1',
          zipCode: 45115,
          country: 'Germany',
        },
        email: 'test@test.com',
      },
      delivery: 'fastest',
    };
    axios
      .post('/orders.json', order)
      .then((response) => {
        this.setState({ isLoading: false, purchasing: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false, purchasing: false });
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
    for (const key in this.state.ingredients) {
      let booleanValue: boolean =
        this.state.ingredients[key as keyof Ingredients] <= 0;
      isDisable = { ...isDisable, [key]: booleanValue };
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          closeModalHandler={this.purchaseHandler}
        >
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <OrderSummary
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              cancelOrder={this.purchaseHandler}
              continueOrder={this.continuePurchaseHandler}
            />
          )}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientsAdded={this.addIngredientHandler}
          ingredientsRemoved={this.removeIngredientHandler}
          price={this.state.totalPrice}
          disableInfo={isDisable}
          isPurchasable={this.state.isPurchasable}
          purchaseHandler={this.purchaseHandler}
        />
      </>
    );
  }
}

export default BurgerBuilder;
