import { applyMiddleware, createStore, Store } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { StoreState } from "types/";
import rootReducer from "redux/reducers";
import rootSaga from "redux/sagas";

/**
 * configures redux-store depending on environment
 */
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store =
    process.env.NODE_ENV === "production"
      ? configureProductionStore(sagaMiddleware)
      : configureDevStore(sagaMiddleware);

  sagaMiddleware.run(rootSaga);

  return store;
};

/**
 * Production store configuration
 */
const configureProductionStore = (sagaMiddleware: SagaMiddleware<any>): Store<StoreState> => {
  console.log("configure production store");

  return createStore(rootReducer, applyMiddleware(sagaMiddleware));
};

/**
 * Development store configuration
 */
const configureDevStore = (sagaMiddleware: SagaMiddleware<any>): Store<StoreState> => {
  console.log("configure dev store");

  const logger = createLogger({
    collapsed: true,
    diff: true,
    duration: true,
    timestamp: true,
  });

  return createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware, logger)));
};

export default configureStore;
