import { combineReducers } from "redux";
import { SAVE_ORDER_FAIL, SAVE_ORDER_REQUEST, SAVE_ORDER_SUCCESS } from "./types";

export const initialStateOrder = {
  id: null,
  products: [],
  orderDetails: null,

  isSending: false,
  errorMessage: null
};

const id = (state = null, action) => {
  switch (action.type) {
    case SAVE_ORDER_REQUEST:
      return null;

    case SAVE_ORDER_SUCCESS:
      return action.id;

    case SAVE_ORDER_FAIL:
    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case SAVE_ORDER_REQUEST:
    case SAVE_ORDER_SUCCESS:
      return null;

    case SAVE_ORDER_FAIL:
      return action.errorMessage;

    default:
      return state;
  }
};

const isSending = (state = false, action) => {
  switch (action.type) {
    case SAVE_ORDER_REQUEST:
      return true;

    case SAVE_ORDER_SUCCESS:
    case SAVE_ORDER_FAIL:
      return false;

    default:
      return state;
  }
};

const products = (state = [], action) => {
  switch (action.type) {
    case SAVE_ORDER_REQUEST:
      return action.products;

    case SAVE_ORDER_SUCCESS:
      return [];

    case SAVE_ORDER_FAIL:
    default:
      return state;
  }
};

const orderDetails = (state = null, action) => {
  switch (action.type) {
    case SAVE_ORDER_REQUEST:
      return action.orderDetails;

    case SAVE_ORDER_SUCCESS:
      return null;

    case SAVE_ORDER_FAIL:
    default:
      return state;
  }
};

export default combineReducers({
  id,
  products,
  orderDetails,
  isSending,
  errorMessage
});