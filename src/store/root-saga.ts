import { userSagas } from "./user/user.saga";
import { categoriesSaga } from "./categories/category.saga";
import { all, call } from "typed-redux-saga/macro";
/*  All creates an Effect description that instructs the middle
ware to run multiple Effects in parallel and wait for all of them to complete. 
It's quite the corresponding API to standard Promise#all.

Call creates an Effect description that instructs the middleware to call 
the function fn with args as arguments.
*/

export function* rootSaga() {
  yield* all([call(categoriesSaga), call(userSagas)]); //* yields all sagas
}
