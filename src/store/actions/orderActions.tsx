import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import axios from '../../axios-orders';

import { ActionTypes } from './actionTypes';
import { OrderData } from '../../containers/OrdersList/OrdersList';
import { StoreState } from '../store';

export type InputsData = Omit<OrderData, 'id'>;

// Interfaces for Purchase initializing and handling

export interface PurchaseInitAction
  extends Action<typeof ActionTypes.PURCHASE_INIT> {}

interface SubmitOrderStart
  extends Action<typeof ActionTypes.SUBMIT_ORDER_START> {}

interface SubmitOrderSuccess
  extends Action<typeof ActionTypes.SUBMIT_ORDER_SUCCESS> {
  payload: { orderId: string; orderData: InputsData };
}

interface SubmitOrderFail
  extends Action<typeof ActionTypes.SUBMIT_ORDER_FAILURE> {}

export type SubmitOrderActions =
  | SubmitOrderStart
  | SubmitOrderSuccess
  | SubmitOrderFail;

// Interfaces for Fetching Orders from database

interface FetchOrdersStart
  extends Action<typeof ActionTypes.FETCH_ORDERS_START> {}

interface FetchOrdersSuccess
  extends Action<typeof ActionTypes.FETCH_ORDERS_SUCCESS> {
  payload: OrderData[];
}

interface FetchOrdersFail
  extends Action<typeof ActionTypes.FETCH_ORDERS_FAILURE> {}

export type FetchOrdersActions =
  | FetchOrdersStart
  | FetchOrdersSuccess
  | FetchOrdersFail;

//  Action Creators

export const purchaseInit = (): PurchaseInitAction => ({
  type: ActionTypes.PURCHASE_INIT,
});

export const submitOrderStart = (
  orderData: InputsData
): ThunkAction<
  Promise<void>,
  StoreState,
  undefined,
  SubmitOrderActions
> => async (
  dispatch: ThunkDispatch<StoreState, undefined, SubmitOrderActions>
): Promise<void> => {
  dispatch({ type: ActionTypes.SUBMIT_ORDER_START });
  axios
    .post('/orders.json', orderData)
    .then((response) =>
      dispatch({
        type: ActionTypes.SUBMIT_ORDER_SUCCESS,
        payload: { orderId: response.data, orderData: orderData },
      })
    )
    .catch((error) => dispatch({ type: ActionTypes.SUBMIT_ORDER_FAILURE }));
};

export const fetchOrders = (): ThunkAction<
  Promise<void>,
  StoreState,
  undefined,
  FetchOrdersActions
> => async (
  dispatch: ThunkDispatch<StoreState, undefined, FetchOrdersActions>
): Promise<void> => {
  dispatch({ type: ActionTypes.FETCH_ORDERS_START });
  axios
    .get('/orders.json')
    .then((res) => {
      const fetchedOrders: OrderData[] = [];
      for (const key in res.data) {
        fetchedOrders.push({
          id: key,
          ...res.data[key],
        });
      }
      dispatch({
        type: ActionTypes.FETCH_ORDERS_SUCCESS,
        payload: fetchedOrders,
      });
    })
    .catch((error) => dispatch({ type: ActionTypes.FETCH_ORDERS_FAILURE }));
};
