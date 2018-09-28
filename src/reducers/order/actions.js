import fetch from "cross-fetch";
import * as R from "ramda";
import { push } from "connected-react-router";
import { SAVE_ORDER_FAIL, SAVE_ORDER_REQUEST, SAVE_ORDER_SUCCESS } from "./types";
import { API_BASE_URL } from "../../api";
import { cleanCart } from "../cart";

const orderResourceUrl = `${API_BASE_URL}/orders`;

export const saveOrderDetails = (orderDetails, products) => ({
  type: SAVE_ORDER_REQUEST,
  orderDetails,
  products
});

export const receiveOrderSuccess = ({ id }) => ({
  type: SAVE_ORDER_SUCCESS,
  id
});

export const receiveOrderFail = ({ message }) => ({
  type: SAVE_ORDER_FAIL,
  errorMessage: `Could not save order. ${message}`
});


export const saveOrder = (orderDetails, products) => {
  return (dispatch, getState )=> {
    dispatch(saveOrderDetails(orderDetails, products));
    console.log(getState());

    return sendSaveOrderRequest(orderDetails, products, dispatch);
  };
};

export const retrySaveOrder = () => {
  return (dispatch, getState) => {
    const { order: { orderDetails, products } } = getState();

    return sendSaveOrderRequest(orderDetails, products, dispatch);
  };
};


const orderSavedSuccessfully = dispatch => json => {
  const a = dispatch(receiveOrderSuccess(json));
  dispatch(push("/order/created"));
  cleanCart()(dispatch);

  return a;
};

const orderSaveFailure = dispatch => error => dispatch(receiveOrderFail(error));

function sendSaveOrderRequest(orderDetails, products, dispatch) {
  const productIds = R.pluck("id", products);

  return fetch(orderResourceUrl, {
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    mode: "CORS",
    credentials: "include",
    body: JSON.stringify({ orderDetails, productIds })
  })
    .then(response => response.json())
    .then(orderSavedSuccessfully(dispatch))
    .catch(orderSaveFailure(dispatch));
}