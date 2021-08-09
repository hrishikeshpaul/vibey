import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

import { rootReducer } from "_store/rootReducer";
import { history } from "util/History";
import { routerMiddleware } from "connected-react-router";

export const store = createStore(
  rootReducer(history),
  composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk, logger)),
);

export type RootStore = ReturnType<typeof rootReducer>;
