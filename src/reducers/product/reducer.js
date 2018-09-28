import { FETCH_PRODUCT_FAIL, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS } from "./types";
import * as R from "ramda";

export const initialStateProduct = {
  product: null,

  id: null,
  isFetching: false,
  errorMessage: null
};

export default (state = initialStateProduct, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        id: action.id,
        isFetching: true,
        errorMessage: null
      };

    case FETCH_PRODUCT_SUCCESS:
      return R.mergeDeepRight(state, {
        product: action.product,
        id: null,
        isFetching: false,
        errorMessage: null
      });

    case FETCH_PRODUCT_FAIL:
      return R.mergeDeepRight(state, {
        isFetching: false,
        errorMessage: action.errorMessage
      });

    default:
      return state;
  }
}