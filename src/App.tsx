import React from 'react';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

import classes from './App.module.css';

function App() {
  return (
    <div className={classes.App}>
      <Layout>
        <BurgerBuilder />
        <Checkout />
      </Layout>
    </div>
  );
}

export default App;
