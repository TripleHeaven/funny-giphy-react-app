import "./index.scss";

import React from "react";
import { render } from "react-dom";

import { register } from "./serviceWorker";
import TestComponent from "./TestComponent";
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";
import { Provider } from "react-redux";
import Layout from "./containers/layout";
// here we disable console and performance for better production experience
// console.log(process.env.NODE_ENV);
// if (!process || !process.env || process.env.NODE_ENV !== "development") {
//   performance.mark = () => undefined as any;
//   performance.measure = () => undefined as any;
//   console.log = () => undefined as any;
// }
const history = createBrowserHistory();
const middlewares = [thunk, routerMiddleware(history)];
const store = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(...middlewares))
);

const App = () => (
  <div styleName="a">
    kek <TestComponent />
  </div>
);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout></Layout>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

register();
