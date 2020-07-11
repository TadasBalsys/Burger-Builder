import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import burgerBuilderReducer from './reducers/burgerBuilderReducer';
import orderReducer from './reducers/orderReducer';

import { Ingredients } from '../components/Burger/Burger';
import { CustomerData } from '../containers/Checkout/ContactData/ContactData';

export interface BurgerBuilderState {
  ingredients: Ingredients;
  totalPrice: number;
  isFetchingData: boolean;
  hasIngredients: boolean;
  fetchError: boolean;
}

export interface OrderState {
  orders: CustomerData[];
  isLoading: boolean;
  purchased: boolean;
}

export interface StoreState {
  burgerBuilderState: BurgerBuilderState;
  orderState: OrderState;
}

const rootReducer = combineReducers({
  burgerBuilderState: burgerBuilderReducer,
  orderState: orderReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
