import React, { Component } from 'react';

import Burger, { Ingredients } from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

interface BurgerBuilderState {
  ingredients: Ingredients;
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
      salad: 1,
      bacon: 1,
      cheese: 2,
      meat: 2,
    },
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
    return this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
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
    return this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
  };

  render() {
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientsAdded={this.addIngredientHandler}
          ingredientsRemoved={this.removeIngredientHandler}
        />
      </>
    );
  }
}

export default BurgerBuilder;
