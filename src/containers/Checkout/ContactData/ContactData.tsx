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
  deliveryMethod: string;
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
  value: string;
  elementType: string;
  elementConfig: InputElementConfig;
  validation: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
  };
  isValid: boolean;
  hasTouched: boolean;
}

export interface InputTypeSelect {
  value: string;
  elementType: string;
  elementConfig: {
    options: SelectElementConfig[];
  };
  validation: {
    required: boolean;
  };
  isValid: boolean;
  hasTouched: boolean;
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
        value: '',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        validation: {
          required: true,
        },
        isValid: false,
        hasTouched: false,
      } as InputTypeInput,
      email: {
        value: '',
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
        },
        validation: {
          required: true,
        },
        isValid: false,
        hasTouched: false,
      } as InputTypeInput,
      street: {
        value: '',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        validation: {
          required: true,
        },
        isValid: false,
        hasTouched: false,
      } as InputTypeInput,
      zipCode: {
        value: '',
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'ZIP Code',
        },
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        isValid: false,
        hasTouched: false,
      } as InputTypeInput,
      deliveryMethod: {
        value: '',
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        validation: {
          required: false,
        },
        isValid: false,
        hasTouched: false,
      } as InputTypeSelect,
    },

    name: '',
    email: '',
    street: '',
    zipCode: 0,
    deliveryMethod: 'fastest',
    isLoading: false,
  };

  orderHandler = (event: React.FormEvent) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer: {
        name: this.state.name,
        email: this.state.email,
        street: this.state.street,
        zipCode: this.state.zipCode,
        deliveryMethod: this.state.deliveryMethod,
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

  // Type Checker
  hasMinLengthProp = (
    input: InputTypeInput | InputTypeSelect
  ): input is InputTypeInput =>
    (input as InputTypeInput).validation.minLength !== undefined;

  checkValidity = (value: string, rules: InputTypeInput | InputTypeSelect) => {
    let isValid = true;

    if (rules.validation.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (this.hasMinLengthProp(rules)) {
      const minLength = rules.validation.minLength;
      const maxLength = rules.validation.maxLength;
      if (minLength && maxLength) {
        isValid =
          value.length >= minLength && value.length <= maxLength && isValid;
      }
    }

    return isValid;
  };

  inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    inputIdentifier: string
  ) => {
    const inputValue: string | number = event.target.value;
    let hasTouched: boolean = inputValue.length ? true : false;

    const key = this.state.orderForm[inputIdentifier as keyof CustomerData];
    const isValid = this.checkValidity(inputValue, key);

    this.setState((prevState) => ({
      ...prevState,
      [inputIdentifier]: inputValue,
      orderForm: {
        ...prevState.orderForm,
        [inputIdentifier]: {
          ...prevState.orderForm[inputIdentifier as keyof OrderForms],
          isValid: isValid,
          hasTouched,
        },
      },
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
          const {
            elementConfig,
            elementType,
            value,
            isValid,
            hasTouched,
            validation,
          } = input.config;
          return (
            <Input
              key={value + i}
              elementType={elementType}
              elementConfig={elementConfig}
              validation={validation.required}
              invalid={isValid}
              hasTouched={hasTouched}
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
