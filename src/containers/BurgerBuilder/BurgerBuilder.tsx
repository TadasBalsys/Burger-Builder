import React, { Component } from 'react';

import Burger, { Ingredients } from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

interface BurgerBuilderState {
  ingredients: Ingredients;
  isPurchasable: boolean;
  totalPrice: number;
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
    totalPrice: 0,
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
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientsAdded={this.addIngredientHandler}
          ingredientsRemoved={this.removeIngredientHandler}
          price={this.state.totalPrice}
          disableInfo={isDisable}
          isPurchasable={this.state.isPurchasable}
        />
      </>
    );
  }
}

export default BurgerBuilder;
