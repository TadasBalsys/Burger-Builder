import { ActionTypes } from '../actions/actionTypes';
import {
  PurchaseInitAction,
  SubmitOrderActions,
  FetchOrdersActions,
} from '../actions/orderActions';
import { OrderData } from '../../containers/OrdersList/OrdersList';
import { OrderState } from '../store';

const initialState: OrderState = {
  order: [],
  ordersList: [],
  isLoading: false,
  purchased: false,
};

const orderReducer = (
  state: OrderState = initialState,
  action: PurchaseInitAction | SubmitOrderActions | FetchOrdersActions
) => {
  switch (action.type) {
    case ActionTypes.PURCHASE_INIT:
      return {
        ...state,
        isLoading: true,
        purchased: false,
      };
    case ActionTypes.SUBMIT_ORDER_START:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.SUBMIT_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        purchased: true,
      };
    case ActionTypes.SUBMIT_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        purchased: false,
      };
    case ActionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ordersList: action.payload as OrderData[],
      };
    case ActionTypes.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        // errorHandling (?)
      };

    default:
      return state;
  }
};

export default orderReducer;
