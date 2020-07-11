import { ActionTypes } from '../actions/actionTypes';
import { OrderState } from '../store';

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  purchased: false,
};

const orderReducer = (state: OrderState = initialState, action: any) => {
  switch (action.types) {
    case ActionTypes.PURCHASE_INIT:
      return {
        ...state,
        isLoading: true,
        purchased: false
      };
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
        isLoading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      };
    case ActionTypes.SUBMIT_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        purchased: false
      };

    default:
      return state;
  }
};

export default orderReducer;
