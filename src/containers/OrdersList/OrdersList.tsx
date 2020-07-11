import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';

import { CustomerData } from '../Checkout/ContactData/ContactData';
import { Ingredients } from '../../components/Burger/Burger';

interface OrdersListState {
  orders: OrderData[] | undefined;
  isLoading: boolean;
}

interface OrderData {
  ingredients: Ingredients;
  totalPrice: number;
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
        {this.state.orders.map((order: OrderData) => (
          <Order
            key={order.id}
            totalPrice={order.totalPrice}
            ingredients={order.ingredients}
          />
        ))}
      </div>
    );
  }
}

export default OrdersList;
