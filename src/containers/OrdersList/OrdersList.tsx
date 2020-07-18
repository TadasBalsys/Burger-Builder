import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

import {
  fetchOrders,
  FetchOrdersActions,
} from '../../store/actions/orderActions';
import { StoreState } from '../../store/store';
import { CustomerData } from '../Checkout/ContactData/ContactData';
import { Ingredients } from '../../components/Burger/Burger';

export interface OrderData {
  ingredients: Ingredients;
  totalPrice: number;
  id: string;
  customer: CustomerData;
}

//  Component Props

interface OwnProps {}

interface StateProps {
  ordersList: OrderData[];
  isLoading: boolean;
}

interface DispatchProps {
  fetchOrders: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class OrdersList extends Component<Props> {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    let orders: JSX.Element | JSX.Element[] = <Spinner />;
    if (!this.props.isLoading) {
      orders = this.props.ordersList.map((order: OrderData) => (
        <Order
          key={order.id}
          totalPrice={order.totalPrice}
          ingredients={order.ingredients}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state: StoreState) => ({
  ordersList: state.orderState.ordersList,
  isLoading: state.orderState.isLoading,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StoreState, undefined, FetchOrdersActions>
): DispatchProps => ({
  fetchOrders: () => dispatch(fetchOrders()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler<Props>(OrdersList, axios));
