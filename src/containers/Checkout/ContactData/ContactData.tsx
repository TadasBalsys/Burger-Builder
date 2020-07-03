import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { Ingredients } from '../../../components/Burger/Burger';

import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

interface ContactDataProps extends RouteComponentProps {
  ingredients: Ingredients;
  totalPrice: number;
}

export interface CustomerData {
  name: string;
  email: string;
  address: {
    street: string;
    postalCode: number;
  };
}

interface ContactDataState extends CustomerData {
  isLoading: boolean;
}

class ContactData extends Component<ContactDataProps, ContactDataState> {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: 0,
    },
    isLoading: false,
  };

  orderHandler = (event: React.FormEvent) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer: {
        name: 'Tadas Balsys',
        email: 'test@test.com',
        address: {
          street: 'Test str. 1',
          postalCode: 45115,
        },
      },
    };
    axios
      .post('/orders.json', order)
      .then((response) => {
        this.setState({ isLoading: false });
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    let form = (
      <form action=''>
        <Input input_type='input' placeholder='Your Name' />
        <Input input_type='input' placeholder='Your Email' />
        <Input input_type='input' placeholder='Your Street' />
        <Input input_type='input' placeholder='Postal' />
        <Button btnType='Success' clickedHandler={this.orderHandler}>
          Order
        </Button>
      </form>
    );

    if (this.state.isLoading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
