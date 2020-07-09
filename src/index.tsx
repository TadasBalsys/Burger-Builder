import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { StoreState } from './store/reducer';
import { Action } from './store/actions';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';

// TODO: Thing again about this. createStore is Generic Function, where StoreState interface describes store state. Actions describes actions, but why there is two unknown???
const store = createStore<StoreState, Action, unknown, unknown>(reducer as any);
// const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
