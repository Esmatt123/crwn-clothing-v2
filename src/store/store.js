import { rootSaga } from "./root-saga";
import createSagaMiddleware from "@redux-saga/core"; //* Creates a Redux middleware and connects the Sagas to the Redux Store
//import thunk from "redux-thunk";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import { compose, createStore, applyMiddleware } from "redux";

/*redux-thunk is a middleware for Redux that allows you to write action 
creators that return a function instead of an action. The inner function 
receives the store's dispatch method, which is used to dispatch an action at a later time. 
This is often useful when you need to perform an asynchronous action, 
such as making an API call, and dispatch an action with the API response.  */

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }
  console.log("type", action.type);
  console.log("payload", action.payload);
  console.log("currentState", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

const persistConfig = {
  key: "root", //* root just means the entire thing will be stored on localStorage
  storage, //* this means local storage, its from the redux-persist library
  blacklist: ["user"], //*this is a list of things we dont want to persist, the user is here because it needs to be automatically logged out
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer); //*creates a replacement for rootReducer that applies configs and puts it on localStorage

const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  sagaMiddleware,
].filter(
  //* this means only log to the console the middleware if this application is in the development face
  Boolean //* the Boolean hides/removes everything falsy. Because the middleware is only gonna return falsy if this is not in developmennt
);

const composeEnhancer =
  //* if process is not in production and there is a window object, use redux devtools, otherwise just use compose
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose; //* compose is a function that applies multiple functions to a value, from right to left. It allows you to apply multiple transformations to a value in a single step.

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  //* the store is a combined state that takes all reducers ands stores them. Replacement to context
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store); //*persists the store to localStorage
