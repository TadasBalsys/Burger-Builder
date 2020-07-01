import React from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';

import Styles from './Layout.module.css';

interface LayoutProps {
  children: JSX.Element;
}

const layout: React.FC<LayoutProps> = (props): JSX.Element => (
  <>
    <Toolbar />
    <main className={Styles.Content}>{props.children}</main>
  </>
);

export default layout;
 