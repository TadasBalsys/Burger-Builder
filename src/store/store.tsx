import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers/burgerBuilderReducer';

import { StoreState } from './reducers/burgerBuilderReducer';
import { Action } from './actions/burgerBuilderActions';

// TODO: Thing again about this. createStore is Generic Function, where StoreState interface describes store state. Actions describes actions, but why there is two unknown???
// const store = createStore(reducer);

const store = createStore<StoreState, Action, unknown, unknown>(
  reducer as any,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
