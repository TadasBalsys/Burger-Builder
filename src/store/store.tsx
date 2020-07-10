import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import BurgerBuilderReducer from './reducers/burgerBuilderReducer';

import { Ingredients } from '../components/Burger/Burger';

// TODO: Thing again about this. createStore is Generic Function, where StoreState interface describes store state. Actions describes actions, but why there is two unknown???
// const store = createStore(reducer);

export interface StoreState {
  ingredients: Ingredients;
  totalPrice: number;
  isFetchingData: boolean;
  hasIngredients: boolean;
  fetchError: boolean
}

const store = createStore(
  BurgerBuilderReducer as any,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
