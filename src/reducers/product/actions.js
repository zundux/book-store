import { FETCH_PRODUCT_FAIL, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS } from "./types";

export const bookResourceUrl = "https://www.googleapis.com/books/v1/volumes";

export const requestProduct = id => ({
  type: FETCH_PRODUCT_REQUEST,
  id
});

export const receiveProductSuccess = json => ({
  type: FETCH_PRODUCT_SUCCESS,
  product: json
});

export const receiveProductFail = error => ({
  type: FETCH_PRODUCT_FAIL,
  errorMessage: `Could not fetch product. ${error.message}`
});

export const fetchProduct = id => {
  return dispatch => {

    dispatch(requestProduct(id));

    const fetchProductUrl = `${bookResourceUrl}/${id}`;

    return fetch(fetchProductUrl)
      .then(response => response.json())
      .then(json => dispatch(receiveProductSuccess(json)))
      .catch(error => dispatch(receiveProductFail(error)));
  };
};
