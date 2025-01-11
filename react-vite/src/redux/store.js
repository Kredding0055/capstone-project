import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import motorcycleReducer from "./motorcycle";
import motorcycleImageReducer from "./motorcycleImages";
import favoritesReducer from "./favorite";
import reviewsReducer from "./review";
import shoppingCartReducer from "./shoppingCart";

const rootReducer = combineReducers({
  session: sessionReducer,
  motorcycle: motorcycleReducer,
  motorcycleImage: motorcycleImageReducer,
  favorite: favoritesReducer,
  review: reviewsReducer,
  shoppingCart: shoppingCartReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
