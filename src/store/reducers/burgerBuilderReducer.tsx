import { ActionTypes } from '../actions/actionTypes';
import { Ingredients } from '../../components/Burger/Burger';
import { StoreState } from '../store';

//TODO: isFetchingData boolean variable are not used in the app. Remove it?
const initialState: StoreState = {
  ingredients: {} as Ingredients,
  totalPrice: 0,
  isFetchingData: false,
  hasIngredients: false,
  fetchError: false,
};

const IngredientsPrices: Ingredients = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

// FIXME: action: any. Change to Action
const BurgerBuilderReducer = (
  state: StoreState = initialState,
  action: any
): StoreState => {
  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] + 1,
        },
        totalPrice: state.totalPrice + IngredientsPrices[action.payload],
      };
    case ActionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] - 1,
        },
        totalPrice: state.totalPrice - IngredientsPrices[action.payload],
      };
    case ActionTypes.SET_FETCHING_START:
      return {
        ...state,
        isFetchingData: true,
        hasIngredients: false,
        fetchError: false
      };
    case ActionTypes.SET_FETCHING_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        isFetchingData: false,
        hasIngredients: true,
        fetchError: false,
      };
    case ActionTypes.SET_FETCHING_FAILURE:
      return {
        ...state,
        isFetchingData: false,
        hasIngredients: false,
        fetchError: true,
      };
    default:
      return state;
  }
};

export default BurgerBuilderReducer;
