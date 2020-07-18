import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import axios from '../../axios-orders';

import { ActionTypes } from './actionTypes';
import { Ingredients } from '../../components/Burger/Burger';
import { StoreState } from '../store';

interface toggleIngAction {
  type: ActionTypes;
  payload: string;
}

interface FetchDataStart
  extends Action<typeof ActionTypes.FETCH_INGREDIENTS_START> {}

interface FetchDataSuccess
  extends Action<typeof ActionTypes.FETCH_INGREDIENTS_SUCCESS> {
  payload: Ingredients;
}

interface FetchDataFail
  extends Action<typeof ActionTypes.FETCH_INGREDIENTS_FAILURE> {}

export type FetchDataActions =
  | FetchDataStart
  | FetchDataSuccess
  | FetchDataFail;

// Type Alias
// export type FetchingActions = SetData | SetFetching;

// export type AllAction = toggleIngAction | FetchingActions;
export type BurgerBuilderActions = toggleIngAction | FetchDataActions;

export const addIngredient = (name: string): toggleIngAction => ({
  type: ActionTypes.ADD_INGREDIENT,
  payload: name,
});

export const removeIngredient = (name: string): toggleIngAction => ({
  type: ActionTypes.REMOVE_INGREDIENT,
  payload: name,
});

export const fetchData = (): ThunkAction<
  Promise<void>,
  StoreState,
  undefined,
  FetchDataActions
> => async (
  dispatch: ThunkDispatch<StoreState, undefined, FetchDataActions>
): Promise<void> => {
  dispatch({ type: ActionTypes.FETCH_INGREDIENTS_START });
  await axios
    .get('/ingredients.json')
    .then((response) => {
      const data: Ingredients = response.data;
      dispatch({
        type: ActionTypes.FETCH_INGREDIENTS_SUCCESS,
        payload: data,
      });
    })
    .catch((error) =>
      dispatch({
        type: ActionTypes.FETCH_INGREDIENTS_FAILURE,
      })
    );
};
