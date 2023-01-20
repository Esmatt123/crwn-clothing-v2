import { RootState } from "../store";
import { CategoryMap } from "./category.type";
import { CategoriesState } from "./category.reducer";
import { createSelector } from "reselect";

const selectCategoryReducer = (state: RootState): CategoriesState =>
  state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap => {
    console.log("selector fired");
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap); //* What the categorymap does is it structures the category items in key: value pairs
  }
);

export const selectCategoriesAreLoading = createSelector(
  //* returns param.categories.isLoading. This is for memoization which improves performance
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
