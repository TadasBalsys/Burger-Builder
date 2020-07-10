import { ActionTypes } from '../actions/actionTypes';

import { CustomerData } from '../../containers/Checkout/ContactData/ContactData';

interface OrderReducerState {
  orders: CustomerData[];
  isLoading: boolean;
}

const initialState: OrderReducerState = {
  orders: [],
  isLoading: false,
};

const orderReducer = (state = initialState, action: any) => {
  switch (action.types) {
    case ActionTypes.SUBMIT_ORDER_START:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.SUBMIT_ORDER_SUCCESS:
      const newOrder = {
        ...action.payload.orderData,
        id: action.payload.orderId,
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
      };
    case ActionTypes.SUBMIT_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default orderReducer;
