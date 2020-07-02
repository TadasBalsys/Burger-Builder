import React, { Component } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

interface LayoutProps {
  children: JSX.Element;
}

interface LayoutState {
  isDrawerVisible: boolean;
}

class Layout extends Component<LayoutProps, LayoutState> {
  state = {
    isDrawerVisible: false,
  };

  drawerShowHandler = () => {
    this.setState((prevState) => ({
      isDrawerVisible: !prevState.isDrawerVisible,
    }));
  };

  render() {
    return (
      <>
        <Toolbar toggleHandler={this.drawerShowHandler} />
        <SideDrawer
          show={this.state.isDrawerVisible}
          closeHandler={this.drawerShowHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
