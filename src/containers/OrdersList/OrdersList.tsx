import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import { CheckoutState } from '../Checkout/Checkout';
import { CustomerData } from '../Checkout/ContactData/ContactData';

interface OrdersListState {
  orders: OrderData[] | undefined;
  isLoading: boolean;
}

export interface OrderData extends CheckoutState {
  id: string;
  customer: CustomerData;
}

class OrdersList extends Component<{}, OrdersListState> {
  state = {
    orders: [],
    isLoading: true,
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then((res) => {
        const fetchedOrders: OrderData[] = [];
        for (const key in res.data) {
          console.log(res.data[key]);
          fetchedOrders.push({
            id: key,
            ...res.data[key],
          });
        }
        console.log(fetchedOrders);
        this.setState(
          () => ({ orders: fetchedOrders, isLoading: false }),
          () => console.log(typeof this.state.orders)
        );
      })
      .catch((error) => error);
  }

  render() {
    return (
      <div>
        {this.state.orders.map(
          // (order, i: number): void=> {console.log(order)}
          (order: OrderData) => (
            <Order
              key={order.id}
              totalPrice={order.totalPrice}
              ingredients={order.ingredients}
            />
          )
        )}
      </div>
    );
  }
}

export default OrdersList;
