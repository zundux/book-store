import queryString from "query-string";
import { FETCH_PRODUCTS_FAIL, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } from "./types";
import { getFetchParams } from "../../helpers";

export const bookResourceUrl = "https://www.googleapis.com/books/v1/volumes";
// get exact volume 'https://www.googleapis.com/books/v1/volumes/volumeId'

export const fetchingDefaultParams = {
  q: "man in black",
  filter: "paid-ebooks", // partial, full, free-ebooks, paid-ebooks, ebooks
  printType: "books", // all, books, magazines

  projection: "lite", // full, lite
  // or specify exact fields by scheme
  // firstLevelField(secondLevelField/thirdLevelField)
  // fields: 'items(volumeInfo/title)' get exact fields

  orderBy: "relevance", // relevance (default), newest

  startIndex: 0, // pagination offset,
  maxResults: 10 // 1-40 items per page
};

export const requestProducts = params => ({
  type: FETCH_PRODUCTS_REQUEST,
  params
});

export const receiveProductsSuccess = json => ({
  type: FETCH_PRODUCTS_SUCCESS,
  products: json.items,
  totalItems: json.totalItems
});

export const receiveProductsFail = error => ({
  type: FETCH_PRODUCTS_FAIL,
  errorMessage: `Could not fetch products. ${error.message}`
});

const getProductsUrl = (bookResourceUrl, requestParams) => {
  const queryParams = queryString.stringify(requestParams);
  return `${bookResourceUrl}?${queryParams}`;
};

export const fetchProducts = params => {
  return dispatch => {
    const requestParams = getFetchParams(fetchingDefaultParams, params);

    dispatch(requestProducts(requestParams));

    const fetchProductsUrl = getProductsUrl(bookResourceUrl, requestParams);

    return fetch(fetchProductsUrl)
      .then(response => response.json())
      .then(json => dispatch(receiveProductsSuccess(json)))
      .catch(error => dispatch(receiveProductsFail(error)));
  };
};
