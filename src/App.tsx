import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import OrdersList from './containers/OrdersList/OrdersList';

import classes from './App.module.css';

function App() {
  return (
    <div className={classes.App}>
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={OrdersList} />
          <Route exact path='/' component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
