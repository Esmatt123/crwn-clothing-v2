import { AnyAction } from "redux"; //* the actions could be anything, of any type, thats why we need anyAction
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

import { Category } from "./category.type";

export type CategoriesState = {
  //* this is the typing out of categories_initial_state
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  //* this is the initial state of these params, in typescript, the type of this is an object of other types
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as AnyAction
) => {
  if (fetchCategoriesStart.match(action)) {
    //* if action == start, ryn fetcCategoriesStart
    return { ...state, isLoading: true };
  }

  if (fetchCategoriesSuccess.match(action)) {
    //* if action === success, run fetchCategoriesSuccess
    return { ...state, categories: action.payload, isLoading: false };
  }

  if (fetchCategoriesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;
  //switch (action.type) {
  //  case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
  //    return { ...state, isLoading: true }; //* When the fetching starts, the isLoading property is true
  //  case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
  //    return { ...state, categories: action.payload, isLoading: false }; //*If  fetching succeeds, return categories and isLoading has stopped
  //  case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
  //    return { ...state, error: action.payload, isLoading: false }; //* if it failed return error, also loading has stopped
  //  default:
  //    return state;
  //}
};
