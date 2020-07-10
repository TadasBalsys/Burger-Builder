import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from '../../axios-orders';
import { ActionTypes } from './actionTypes';

import { ContactDataState as OrderData } from '../../containers/Checkout/ContactData/ContactData';

export const submitOrderStart = (
  orderData: OrderData
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): Promise<void> => {
  dispatch({ type: ActionTypes.SUBMIT_ORDER_START });
  axios
    .post('/orders', orderData)
    .then((response) =>
      dispatch({
        type: ActionTypes.SUBMIT_ORDER_SUCCESS,
        payload: { orderId: response.data, orderData: orderData },
      })
    )
    .catch((error) => dispatch({ type: ActionTypes.SUBMIT_ORDER_FAILURE }));
};
