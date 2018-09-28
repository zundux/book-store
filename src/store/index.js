import { applyMiddleware, compose, createStore } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import reducers from "../reducers";
// import {persistReducer} from 'redux-persist'
// // import {persistReducer, persistStore} from 'redux-persist'
// import {persistConfig} from "./persist-store-config";


// const persistedReducer = persistReducer(persistConfig, reducers)

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history)
];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export const store = createStore(
  connectRouter(history)(reducers),
  // connectRouter(history)(persistedReducer),
  initialState,
  composedEnhancers
);
// export const persistor = persistStore(store)