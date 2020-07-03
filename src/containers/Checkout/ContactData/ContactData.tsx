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
  street: string;
  zipCode: number;
}

interface ContactDataState extends CustomerData {
  isLoading: boolean;
  orderForm: OrderForms;
}

interface OrderForms {
  name: InputTypeInput;
  email: InputTypeInput;
  street: InputTypeInput;
  zipCode: InputTypeInput;
  deliveryMethod: InputTypeSelect;
}

interface InputTypeInput {
  elementType: string;
  elementConfig: InputElementConfig;
  value: string;
}

export interface InputTypeSelect {
  elementType: string;
  elementConfig: {
    options: SelectElementConfig[];
  };
  value: string;
}

export interface InputElementConfig {
  type: string;
  placeholder: string;
}

export interface SelectElementConfig {
  value: string;
  displayValue: string;
}

class ContactData extends Component<ContactDataProps, ContactDataState> {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
      } as InputTypeInput,
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Name',
        },
        value: '',
      } as InputTypeInput,
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
      } as InputTypeInput,
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'ZIP Code',
        },
        value: '',
      } as InputTypeInput,
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: '',
      } as InputTypeSelect,
    },

    name: '',
    email: '',
    street: '',
    zipCode: 0,

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
          zipCode: 45115,
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

  inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputIdentifier: string
  ) => {
    const inputValue: string | number = event.target.value;
    this.setState((prevState) => ({
      ...prevState,
      [inputIdentifier]: inputValue,
    }));
  };

  render() {
    let formElementsArr = [];
    for (const key in this.state.orderForm) {
      formElementsArr.push({
        id: key,
        config: this.state.orderForm[key as keyof OrderForms],
      });
    }

    let form = (
      <form action=''>
        {formElementsArr.map((input, i) => {
          const { elementConfig, elementType, value } = input.config;
          return (
            <Input
              key={value + i}
              elementType={elementType}
              elementConfig={elementConfig}
              changeHandler={(event) =>
                this.inputChangeHandler(event, input.id)
              }
            />
          );
        })}
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
