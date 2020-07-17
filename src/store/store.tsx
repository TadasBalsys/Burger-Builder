import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import burgerBuilderReducer from './reducers/burgerBuilderReducer';
import orderReducer from './reducers/orderReducer';

import { Ingredients } from '../components/Burger/Burger';
import { CustomerData } from '../containers/Checkout/ContactData/ContactData';
import { OrderData } from '../containers/OrdersList/OrdersList';

export interface BurgerBuilderState {
  ingredients: Ingredients;
  totalPrice: number;
  isFetchingData: boolean;
  hasIngredients: boolean;
  fetchError: boolean;
}

export interface OrderState {
  order: CustomerData[];
  ordersList: OrderData[];
  isLoading: boolean;
  purchased: boolean;
}

// export interface StoreState {
//   burgerBuilderState: BurgerBuilderState;
//   orderState: OrderState;
// }

// const middlewares = [thunk];

const rootReducer = combineReducers({
  burgerBuilderState: burgerBuilderReducer,
  orderState: orderReducer,
});

/*
  ReturnType automatically gets types of rootReducer, a.k.a describes state types.
  NOTE! Must remove StoreState in combineReducer<StoreState> to ReturnType to work
  */
export type StoreState = ReturnType<typeof rootReducer>;

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger);
// }

// TODO: Remove logger in production

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;
