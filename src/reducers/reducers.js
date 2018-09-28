import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import cart from "./cart";
import catalog from "./catalog";
import order from "./order";
import product from "./product";

export default combineReducers({
  cart,
  catalog,
  form,
  order,
  product
});