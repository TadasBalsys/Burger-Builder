import { ActionTypes } from '../actions/actionTypes';
import { Ingredients } from '../../components/Burger/Burger';
import { BurgerBuilderState } from '../store';
import { BurgerBuilderActions } from '../actions/burgerBuilderActions';

//TODO: isFetchingData boolean variable are not used in the app. Remove it?
const initialState: BurgerBuilderState = {
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

const burgerBuilderReducer = (
  state: BurgerBuilderState = initialState,
  action: BurgerBuilderActions
): BurgerBuilderState => {
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
    case ActionTypes.FETCH_INGREDIENTS_START:
      return {
        ...state,
        isFetchingData: true,
        hasIngredients: false,
        fetchError: false,
      };
    case ActionTypes.FETCH_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload as Ingredients,
        totalPrice: 0,
        isFetchingData: false,
        hasIngredients: true,
        fetchError: false,
      };
    case ActionTypes.FETCH_INGREDIENTS_FAILURE:
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

export default burgerBuilderReducer;
