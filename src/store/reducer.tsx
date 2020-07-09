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

const reducer = (state: StoreState = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] + 1,
        },
      };
    case ActionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] - 1,
        },
      };
    default:
      return state;
  }
};

export default reducer;
