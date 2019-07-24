import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import authReducer from "../reducers/auth";

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer
    }),
    composeWithDevTools()
  );

  return store;
};
