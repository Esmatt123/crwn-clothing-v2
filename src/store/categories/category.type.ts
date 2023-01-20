export enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_START = "category/FETCH_CATEGORIES_START", //*Start of fetching process
  FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS", //*Fetching succeeds
  FETCH_CATEGORIES_FAILED = "category/FETCH_CATEGORIES_FAILED", //*Fetching fails
}

export type CategoryItem = {
  //* typing the parameterns of the category items
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type Category = {
  //* typing parameters of category
  title: string;
  imageUrl: string;
  items: CategoryItem[];
};

export type CategoryMap = {
  [key: string]: CategoryItem[]; //* this will structure the category items in key value pairs
};
