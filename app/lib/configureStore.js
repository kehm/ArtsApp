/**
 * @file configureStore.js
 * @author Kjetil Fossheim
 *
 * configure redux Store
 */

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
import { createLogger } from "redux-logger";
import { createPromise } from "redux-promise-middleware";

// add logger for logger
export default function configureStore(initialState: any = undefined) {
  const logger = createLogger({ predicate: (getState, action) => __DEV__ });
  const enhancer = compose(
    applyMiddleware(thunk),
    applyMiddleware(
      createPromise({
        promiseTypeSuffixes: ["LOADING", "SUCCESS", "ERROR"]
      })
    ),
    applyMiddleware(logger)
  );
  return createStore(rootReducer, initialState, enhancer);
}
