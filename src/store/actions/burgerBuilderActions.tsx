import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import axios from '../../axios-orders';

import { ActionTypes } from './actionTypes';
import { Ingredients } from '../../components/Burger/Burger';

export interface toggleIngAction {
  type: ActionTypes;
  payload: string;
}

//FIXME: ANY
export interface SetData {
  type: ActionTypes.SET_FETCHING_SUCCESS;
  payload: Ingredients;
}

export interface SetFetching {
  type: ActionTypes.SET_FETCHING_START;
  isFetching: boolean;
}

// Type Alias
export type FetchingActions = SetData | SetFetching;

export type Action = toggleIngAction | FetchingActions;

export const addIngredient = (name: string) => ({
  type: ActionTypes.ADD_INGREDIENT,
  payload: name,
});

export const removeIngredient = (name: string) => ({
  type: ActionTypes.REMOVE_INGREDIENT,
  payload: name,
});

export const fetchData = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
  dispatch({ type: ActionTypes.SET_FETCHING_START });
  await axios
    .get('/ingredients.json')
    .then((response) =>
      dispatch({
        type: ActionTypes.SET_FETCHING_SUCCESS,
        payload: response.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: ActionTypes.SET_FETCHING_FAILURE,
      })
    );
};
