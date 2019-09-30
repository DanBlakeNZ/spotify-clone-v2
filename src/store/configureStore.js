import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import authReducer from "../reducers/authReducer";
import currentUserReducer from "../reducers/currentUserReducer";
import backgroundColorReducer from "../reducers/backgroundColorReducer";

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      currentUser: currentUserReducer,
      bgcolor: backgroundColorReducer
    }),
    composeWithDevTools()
  );

  return store;
};
