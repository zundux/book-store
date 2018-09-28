import reducer, { initialStateProduct } from "./reducer";
import * as types from "./types";
import { errorMessage, fetchProductData, fetchProductData2 } from "./mock";

describe("product reducers", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialStateProduct);
  });

  it("should set request id " +
    "(case FETCH_PRODUCT_REQUEST)", () => {
    const id = 1;

    expect(reducer(
      initialStateProduct,
      {
        type: types.FETCH_PRODUCT_REQUEST,
        id
      }
    )).toEqual({
      ...initialStateProduct,
      id,
      isFetching: true
    });
  });

  it("should set product " +
    "(case FETCH_PRODUCT_SUCCESS)", () => {
    const id = 1;

    expect(reducer(
      {
        ...initialStateProduct,
        id,
        isFetching: true
      },
      {
        type: types.FETCH_PRODUCT_SUCCESS,
        product: fetchProductData
      }
    )).toEqual({
      ...initialStateProduct,
      id: null,
      product: fetchProductData,
      isFetching: false
    });
  });

  it("should set product " +
    "when some product was loaded before " +
    "(case FETCH_PRODUCT_SUCCESS)", () => {
    const id = 2;
    expect(reducer(
      {
        ...initialStateProduct,
        id,
        product: fetchProductData,
        isFetching: true
      },
      {
        type: types.FETCH_PRODUCT_SUCCESS,
        id: null,
        product: fetchProductData2
      }
    )).toEqual({
      ...initialStateProduct,
      id: null,
      product: fetchProductData2,
      isFetching: false
    });
  });

  it("should set error message on fail fetch product " +
    "(case FETCH_PRODUCT_FAIL)", () => {
    const id = 2;

    expect(reducer(
      {
        ...initialStateProduct,
        id,
        isFetching: true
      },
      {
        type: types.FETCH_PRODUCT_FAIL,
        errorMessage
      }
    )).toEqual({
      ...initialStateProduct,
      id,
      isFetching: false,
      errorMessage
    });
  });

});
