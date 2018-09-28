import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { SERVICE_UNAVAILABLE } from "http-status-codes";
import { initialStateCatalog } from "./reducer";
import { FETCH_PRODUCTS_FAIL, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } from "./types";
import {
  bookResourceUrl,
  fetchingDefaultParams,
  fetchProducts,
  receiveProductsFail,
  receiveProductsSuccess,
  requestProducts
} from ".";
import queryString from "query-string";
import { getFetchParams } from "../../helpers";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Catalog actions", () => {
  it("creates FETCH_PRODUCTS_REQUEST when products loading has been begun", () => {
    const params = { q: "man in black" };

    const expectedActions = [{
      type: FETCH_PRODUCTS_REQUEST,
      params
    }];
    const store = mockStore(initialStateCatalog);

    store.dispatch(requestProducts(params));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("creates FETCH_PRODUCTS_SUCCESS when products has been loaded successfully", () => {
    const products = [{ id: 1 }, { id: 2 }];
    const totalItems = 102;
    const body = {
      items: products,
      totalItems
    };

    const expectedActions = [{
      type: FETCH_PRODUCTS_SUCCESS,
      products,
      totalItems
    }];
    const store = mockStore(initialStateCatalog);

    store.dispatch(receiveProductsSuccess(body));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("creates FETCH_PRODUCTS_FAIL when clearing the cart has been begun", () => {
    const message = "some error";

    const expectedActions = [{
      type: FETCH_PRODUCTS_FAIL,
      errorMessage: `Could not fetch products. ${message}`
    }];
    const store = mockStore(initialStateCatalog);

    store.dispatch(receiveProductsFail({ message }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});


describe("Catalog async actions", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("creates FETCH_PRODUCTS_SUCCESS when loading products has been done successfully", () => {
    const params = { q: "man in black" };
    const requestParams = getFetchParams(fetchingDefaultParams, params);
    const queryParams = queryString.stringify(requestParams);
    const fetchProductsUrl = `${bookResourceUrl}?${queryParams}`;

    const products = [{ id: 1 }, { id: 2 }];
    const totalItems = 102;
    const body = {
      items: products,
      totalItems
    };

    fetch.mockResponseOnce(body);

    const expectedActions = [
      {
        type: FETCH_PRODUCTS_REQUEST,
        params: requestParams
      },
      {
        type: FETCH_PRODUCTS_SUCCESS,
        products: body.items,
        totalItems: body.totalItems
      }
    ];
    const store = mockStore(initialStateCatalog);

    const request = store.dispatch(fetchProducts(params))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

    expect(fetch).toHaveBeenCalled();
    expect(fetch.mock.calls[0][0]).toEqual(fetchProductsUrl);

    return request;
  });

  it("creates FETCH_PRODUCTS_FAIL when a loading products request has been failed", () => {
    const params = { q: "man in black" };
    const requestParams = getFetchParams(fetchingDefaultParams, params);
    const queryParams = queryString.stringify(requestParams);
    const fetchProductsUrl = `${bookResourceUrl}?${queryParams}`;

    const errorMessage = "some error message";

    fetch.mockReject({
      status: SERVICE_UNAVAILABLE,
      message: errorMessage
    });

    const expectedActions = [
      {
        type: FETCH_PRODUCTS_REQUEST,
        params: requestParams
      },
      {
        type: FETCH_PRODUCTS_FAIL,
        errorMessage: `Could not fetch products. ${errorMessage}`
      }
    ];

    const store = mockStore(initialStateCatalog);

    const request = store.dispatch(fetchProducts())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });

    expect(fetch).toHaveBeenCalled();
    expect(fetch.mock.calls[0][0]).toEqual(fetchProductsUrl);

    return request;
  });
});