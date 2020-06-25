import React from 'react';

import Layout from './components/Layout/Layout';

import styles from'./App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <Layout>
        <p>Test</p>
      </Layout>
    </div>
  );
}

export default App;
