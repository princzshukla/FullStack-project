import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';  // ✅ Correct
import { composeWithDevTools } from "redux-devtools-extension";

// Import all your reducers here
// For example:
// import { userReducer } from "./reducers/userReducer";
// import { productReducer } from "./reducers/productReducer";
// import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
  // Add your reducers here
  // user: userReducer,
  // products: productReducer,
  // cart: cartReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
