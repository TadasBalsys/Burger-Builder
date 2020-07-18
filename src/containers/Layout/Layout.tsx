import React, { Component } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css';

interface Props {
  children: JSX.Element;
}

interface State {
  isDrawerVisible: boolean;
}

class Layout extends Component<Props, State> {
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
