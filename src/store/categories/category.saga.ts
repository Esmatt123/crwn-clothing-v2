import { CATEGORIES_ACTION_TYPES } from "./category.type";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

import { takeLatest, all, call, put } from "typed-redux-saga/macro";

export function* fetchCategoriesAsync() {
  //*Asyncly fetches 'categories' from firestore db and returns error if something goes wrong

  try {
    const categoriesArray = yield* call(getCategoriesAndDocuments); //* the categoriesArray fetches the categories collection reference. yield instead of await, and the call method is used to invoke the function explicitly
    yield* put(fetchCategoriesSuccess(categoriesArray)); //*if the fetching succeeded, categories = categoriesArray
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error)); //* If failed, payload = error, or in english, return error. put is equivalent to dispatch in redux-saga
  }
}

export function* onFetchCategories() {
  //* executes fetchCategoriesAsync and messages that the fetching has started and is loading
  //* takeLatest is also taking type and action as params
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  ); //* takeLatest means if you hear multiple of the same action just take the latest one.
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]); //* Only once everything inside this all array has been executed will whatever is under this yield run also
}
