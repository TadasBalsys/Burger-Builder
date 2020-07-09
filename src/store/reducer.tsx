import { Action } from './actions';

import { ActionTypes } from './actionTypes';
import { Ingredients } from '../components/Burger/Burger';

export interface StoreState {
  ingredients: Ingredients;
  totalPrice: number;
}

const initialState: StoreState = {
  // FIXME: Added mock data, remove when async redux added to app
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  } as Ingredients,
  totalPrice: 0,
};

const IngredientsPrices: Ingredients = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state: StoreState = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] + 1,
        },
        totalPrice: state.totalPrice + IngredientsPrices[action.payload],
      };
    case ActionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] - 1,
        },
        totalPrice: state.totalPrice - IngredientsPrices[action.payload],
      };
    default:
      return state;
  }
};

export default reducer;
