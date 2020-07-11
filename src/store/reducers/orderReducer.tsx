import { ActionTypes } from '../actions/actionTypes';
import { OrderState } from '../store';

const initialState: OrderState = {
  orders: [],
  isLoading: false,
};

const orderReducer = (state: OrderState = initialState, action: any) => {
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
        isLoading: false,
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
