import { ActionTypes } from './actionTypes';

export interface toggleIngAction {
  type: ActionTypes;
  payload: string;
}

// Type Alias
export type Action = toggleIngAction;
