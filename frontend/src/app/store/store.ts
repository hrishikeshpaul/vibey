import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

import { rootReducer } from "./rootReducer";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));

export type RootStore = ReturnType<typeof rootReducer>;
