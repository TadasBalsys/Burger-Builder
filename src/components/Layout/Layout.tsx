import React from 'react';

import Styles from './Layout.module.css';

interface LayoutProps {
  children: JSX.Element
}

const layout: React.FC<LayoutProps> = (props): JSX.Element => (
  <>
    <div>Toolbar, SideDrawer, BackDrop</div>
    <main className={Styles.Content}>{props.children}</main>
  </>
);

export default layout;
