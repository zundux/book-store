import { FETCH_PRODUCTS_FAIL, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } from "./types";
import * as R from "ramda";

export const initialStateCatalog = {
  products: [],

  params: null,
  totalItems: 0,

  isFetching: false,
  errorMessage: null
};

export default (state = initialStateCatalog, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        params: action.params,
        isFetching: true,
        errorMessage: null
      };

    case FETCH_PRODUCTS_SUCCESS:
      return R.mergeDeepRight(state, {
        products: action.products,
        totalItems: action.totalItems,
        isFetching: false,
        errorMessage: null
      });

    case FETCH_PRODUCTS_FAIL:
      return R.mergeDeepRight(state, {
        isFetching: false,
        errorMessage: action.errorMessage
      });

    default:
      return state;
  }
}