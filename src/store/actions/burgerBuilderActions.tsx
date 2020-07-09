import { ActionTypes } from './actionTypes';

export interface toggleIngAction {
  type: ActionTypes;
  payload: string;
}

// Type Alias
export type Action = toggleIngAction;

export const addIngredient = (name: string) => ({
  type: ActionTypes.ADD_INGREDIENT,
  payload: name,
});

export const removeIngredient = (name: string) => ({
  type: ActionTypes.REMOVE_INGREDIENT,
  payload: name,
});
