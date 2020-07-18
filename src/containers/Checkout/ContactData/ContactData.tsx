import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../../axios-orders';

import { Ingredients } from '../../../components/Burger/Burger';
import { StoreState } from '../../../store/store';

import {
  submitOrderStart,
  SubmitOrderActions,
  InputsData,
} from '../../../store/actions/orderActions';

import classes from './ContactData.module.css';

// Component Props

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  ingredients: Ingredients;
  totalPrice: number;
}

interface DispatchProps {
  submitOrder: (orderData: InputsData) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

// Component State

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

// Input Types

interface OrderForms {
  name: InputTypeInput;
  email: InputTypeInput;
  street: InputTypeInput;
  zipCode: InputTypeInput;
  deliveryMethod: InputTypeSelect;
}

interface Input {
  elementType: string;
  isValid: boolean;
  value: string;
  hasTouched: boolean;
}

interface InputTypeInput extends Input {
  elementConfig: InputElementConfig;
  validation: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
  };
}

export interface InputTypeSelect extends Input {
  elementConfig: {
    options: SelectElementConfig[];
  };
  validation: {
    required: boolean;
  };
}

export interface InputElementConfig {
  type: string;
  placeholder: string;
}

export interface SelectElementConfig {
  value: string;
  displayValue: string;
}

class ContactData extends Component<Props, ContactDataState> {
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
    const { name, email, street, zipCode, deliveryMethod } = this.state;
    /* 
     TODO: Now if user write something in the input and than deletes it, the input html elem are not receiving css class Invalid and user can submit order with empty values. 
    Need to implement method to check (value) => value !== ""
    */
    const { ingredients, totalPrice } = this.props;
    const order: InputsData = {
      ingredients,
      totalPrice,
      customer: {
        name,
        email,
        street,
        zipCode,
        deliveryMethod,
      },
    };
    this.props.submitOrder(order);
    // "Redirects" back to main page
    this.props.history.push('/');
  };

  // Type Checker a.k.a Type Guard
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
    let hasTouched: boolean = true;

    const key = this.state.orderForm[inputIdentifier as keyof CustomerData];
    const isValid = this.checkValidity(inputValue, key);

    this.setState((prevState) => ({
      ...prevState,
      [inputIdentifier]: inputValue,
      orderForm: {
        ...prevState.orderForm,
        [inputIdentifier]: {
          ...prevState.orderForm[inputIdentifier as keyof OrderForms],
          isValid,
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
              invalid={!isValid}
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

const mapStateToProps = (state: StoreState) => ({
  ingredients: state.burgerBuilderState.ingredients,
  totalPrice: state.burgerBuilderState.totalPrice,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StoreState, undefined, SubmitOrderActions>
) => ({
  submitOrder: (orderData: InputsData) => dispatch(submitOrderStart(orderData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withErrorHandler<Props>(ContactData, axios)));
