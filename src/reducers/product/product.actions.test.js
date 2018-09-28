import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { SERVICE_UNAVAILABLE } from "http-status-codes";
import { initialStateProduct } from "./reducer";
import { FETCH_PRODUCT_FAIL, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS } from "./types";
import { bookResourceUrl, fetchProduct, receiveProductFail, receiveProductSuccess, requestProduct } from "./actions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Product actions", () => {
  it("creates FETCH_PRODUCT_REQUEST when product loading has been begun", () => {
    const id = 1;

    const expectedActions = [{
      type: FETCH_PRODUCT_REQUEST,
      id
    }];
    const store = mockStore(initialStateProduct);

    store.dispatch(requestProduct(id));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("creates FETCH_PRODUCT_SUCCESS when product has been loaded successfully", () => {
    const product = { id: 1 };
    const body = product;

    const expectedActions = [{
      type: FETCH_PRODUCT_SUCCESS,
      product
    }];
    const store = mockStore(initialStateProduct);

    store.dispatch(receiveProductSuccess(body));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("creates FETCH_PRODUCT_FAIL when clearing the cart has been begun", () => {
    const message = "some error";

    const expectedActions = [{
      type: FETCH_PRODUCT_FAIL,
      errorMessage: `Could not fetch product. ${message}`
    }];
    const store = mockStore(initialStateProduct);

    store.dispatch(receiveProductFail({ message }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});


describe("Product async actions", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("creates FETCH_PRODUCT_SUCCESS when loading product has been done successfully", () => {
    const id = 1;
    const fetchProductUrl = `${bookResourceUrl}/${id}`;
    const body = { id: 1 };

    fetch.mockResponseOnce(body);

    const expectedActions = [
      {
        type: FETCH_PRODUCT_REQUEST,
        id
      },
      {
        type: FETCH_PRODUCT_SUCCESS,
        product: body
      }
    ];
    const store = mockStore(initialStateProduct);

    const request = store.dispatch(fetchProduct(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

    expect(fetch).toHaveBeenCalled();
    expect(fetch.mock.calls[0][0]).toEqual(fetchProductUrl);

    return request;
  });

  it("creates FETCH_PRODUCT_FAIL when a loading product request has been failed", () => {
    const id = 1;
    const fetchProductUrl = `${bookResourceUrl}/${id}`;

    const errorMessage = "some error message";

    fetch.mockReject({
      status: SERVICE_UNAVAILABLE,
      message: errorMessage
    });

    const expectedActions = [
      {
        type: FETCH_PRODUCT_REQUEST,
        id
      },
      {
        type: FETCH_PRODUCT_FAIL,
        errorMessage: `Could not fetch product. ${errorMessage}`
      }
    ];

    const store = mockStore(initialStateProduct);

    const request = store.dispatch(fetchProduct(id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

    expect(fetch).toHaveBeenCalled();
    expect(fetch.mock.calls[0][0]).toEqual(fetchProductUrl);

    return request;
  });
});