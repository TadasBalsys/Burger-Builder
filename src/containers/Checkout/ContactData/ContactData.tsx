import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { Ingredients } from '../../../components/Burger/Burger';

import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

interface ContactDataProps extends RouteComponentProps {
  ingredients: Ingredients;
  totalPrice: number;
}

class ContactData extends Component<ContactDataProps> {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    isLoading: false,
  };

  orderHandler = (event: React.FormEvent) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const order = {
      ingredient: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Tadas Balsys',
        address: {
          street: 'Test str. 1',
          zipCode: 45115,
          country: 'Germany',
        },
        email: 'test@test.com',
      },
      delivery: 'fastest',
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
        <input
          className={classes.Input}
          type='text'
          name='name'
          placeholder='Your Name'
        />
        <input
          className={classes.Input}
          type='email'
          name='email'
          placeholder='Your Email'
        />
        <input
          className={classes.Input}
          type='text'
          name='street'
          placeholder='Your Street'
        />
        <input
          className={classes.Input}
          type='text'
          name='postal'
          placeholder='Postal'
        />
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
