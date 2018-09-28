import * as types from "./types";
import reducer from ".";
import { initialStateCatalog } from "./reducer";
import { errorMessage, fetchProductsData, fetchProductsDataPage2, fetchProductsParams } from "./mock";

describe("catalog reducers", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialStateCatalog);
  });

  it("should set request params " +
    "(case FETCH_PRODUCTS_REQUEST)", () => {
    expect(reducer(
      initialStateCatalog,
      {
        type: types.FETCH_PRODUCTS_REQUEST,
        ...fetchProductsParams
      }
    )).toEqual({
      ...initialStateCatalog,
      ...fetchProductsParams,
      isFetching: true
    });
  });

  it("should set products and set products list info " +
    "(case FETCH_PRODUCTS_SUCCESS)", () => {
    expect(reducer(
      {
        ...initialStateCatalog,
        ...fetchProductsParams,
        isFetching: true
      },
      {
        type: types.FETCH_PRODUCTS_SUCCESS,
        ...fetchProductsData
      }
    )).toEqual({
      ...initialStateCatalog,
      ...fetchProductsParams,
      ...fetchProductsData,
      isFetching: false
    });
  });

  it("should set products and set products list info " +
    "when some products were loaded before " +
    "(case FETCH_PRODUCTS_SUCCESS)", () => {
    expect(reducer(
      {
        ...initialStateCatalog,
        ...fetchProductsParams,
        ...fetchProductsData,
        isFetching: true
      },
      {
        type: types.FETCH_PRODUCTS_SUCCESS,
        ...fetchProductsDataPage2
      }
    )).toEqual({
      ...initialStateCatalog,
      ...fetchProductsParams,
      ...fetchProductsDataPage2,
      isFetching: false
    });
  });

  it("should set error message on fail fetch products " +
    "(case FETCH_PRODUCTS_FAIL)", () => {
    expect(reducer(
      {
        ...initialStateCatalog,
        ...fetchProductsParams,
        isFetching: true
      },
      {
        type: types.FETCH_PRODUCTS_FAIL,
        errorMessage
      }
    )).toEqual({
      ...initialStateCatalog,
      ...fetchProductsParams,
      isFetching: false,
      errorMessage
    });
  });

});
