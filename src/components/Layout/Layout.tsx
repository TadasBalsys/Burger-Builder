import React from 'react';

interface LayoutProps {
  children: JSX.Element
}

const layout: React.FC<LayoutProps> = (props): JSX.Element => (
  <>
    <div>Toolbar, SideDrawer, BackDrop</div>
    <main>{props.children}</main>
  </>
);

export default layout;
