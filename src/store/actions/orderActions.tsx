import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from '../../axios-orders';
import { ActionTypes } from './actionTypes';

import { OrderData } from '../../containers/OrdersList/OrdersList';

export const purchaseInit = () => ({
  type: ActionTypes.PURCHASE_INIT,
});

export const submitOrderStart = (
  orderData: OrderData
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
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
  {},
  {},
  AnyAction
> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
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
    .catch((error) => {
      dispatch({ type: ActionTypes.FETCH_ORDERS_FAILURE });
    });
};
