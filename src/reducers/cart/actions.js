import * as R from "ramda";
import { ADD_TO_CART, CHANGE_PRODUCT_AMOUNT_IN_CART, CLEAN_CART, REMOVE_FROM_CART } from "./types";

export const addToCart = (product, amount) => dispatch => dispatch({
  type: ADD_TO_CART,
  product,
  amount
});

export const removeFromCart = (product) => dispatch => dispatch({
  type: REMOVE_FROM_CART,
  product
});

export const cleanCart = () => dispatch => dispatch({
  type: CLEAN_CART
});

export const changeAmountOfProductInCart = (product, amount) => dispatch => {
  if (!R.is(Number, amount) || isNaN(amount) || amount <= 0) {
    amount = 1;
  }

  dispatch({
    type: CHANGE_PRODUCT_AMOUNT_IN_CART,
    product,
    amount
  });
};

