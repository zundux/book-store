import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { initialStateOrder } from "./reducer";
import { SAVE_ORDER_FAIL, SAVE_ORDER_REQUEST, SAVE_ORDER_SUCCESS } from "./types";
import { receiveOrderFail, receiveOrderSuccess, saveOrderDetails } from "./actions";
import { retrySaveOrder, saveOrder } from ".";
import { SERVICE_UNAVAILABLE } from "http-status-codes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Order actions", () => {
  it("creates SAVE_ORDER_REQUEST when an order saving has been begun", () => {
    const orderDetails = { someField: "some value" };
    const products = [{ id: 1, amount: 1 }, { id: 2, amount: 2 }];

    const expectedActions = [{
      type: SAVE_ORDER_REQUEST,
      orderDetails,
      products
    }];
    const store = mockStore(initialStateOrder);

    store.dispatch(saveOrderDetails(orderDetails, products));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("creates SAVE_ORDER_SUCCESS when an order has been saved successfully", () => {
    const id = 22;

    const expectedActions = [{
      type: SAVE_ORDER_SUCCESS,
      id
    }];
    const store = mockStore(initialStateOrder);

    store.dispatch(receiveOrderSuccess({ id }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("creates SAVE_ORDER_FAIL when an order saving has been failed", () => {
    const message = "some error";

    const expectedActions = [{
      type: SAVE_ORDER_FAIL,
      errorMessage: `Could not save order. ${message}`
    }];
    const store = mockStore(initialStateOrder);

    store.dispatch(receiveOrderFail({ message }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});


// describe("Order async actions", () => {
//   beforeEach(() => {
//     fetch.resetMocks();
//   });
//
//   it("creates SAVE_ORDER_SUCCESS when an order saving has been done successfully", () => {
//     const orderDetails = { someField: "some value" };
//     const products = [{ id: 1, amount: 1 }, { id: 2, amount: 2 }];
//     const id = 22;
//     const body = { id };
//
//     fetch.mockResponseOnce(body);
//
//     const expectedActions = [
//       {
//         type: SAVE_ORDER_REQUEST,
//         orderDetails,
//         products
//       },
//       {
//         type: SAVE_ORDER_SUCCESS,
//         id
//       },
//       {
//         "payload": {
//           "args": ["/order/created"], "method": "push"
//         },
//         "type": "@@router/CALL_HISTORY_METHOD"
//       },
//       { "type": "cart/CLEAN_CART" }
//     ];
//     const store = mockStore(initialStateOrder);
//
//     store.dispatch(saveOrder(orderDetails, products))
//       .then(() => {
//         expect(store.getActions()).toEqual(expectedActions);
//       });
//
//     // expect(fetch).toHaveBeenCalled();
//     // todo check post request body
//
//
//     fetch.mockResponseOnce(body);
//     const expectedActionsAfterRetry = [
//       {
//         type: SAVE_ORDER_REQUEST,
//         orderDetails,
//         products
//       },
//       {
//         type: SAVE_ORDER_SUCCESS,
//         id
//       },
//       {
//         type: SAVE_ORDER_REQUEST,
//         orderDetails,
//         products
//       },
//       {
//         type: SAVE_ORDER_SUCCESS,
//         id
//       }
//     ];
//     store.dispatch(retrySaveOrder())
//       .then(() => {
//         expect(store.getActions()).toEqual(expectedActionsAfterRetry);
//       });
//
//     expect(fetch).toHaveBeenCalledTimes(2);
//     // todo check post request body
//
//   });
//
//   it("creates SAVE_ORDER_FAIL when an order saving has been failed", () => {
//     const errorMessage = "some error message";
//     const orderDetails = { someField: "some value" };
//     const products = [{ id: 1, amount: 1 }, { id: 2, amount: 2 }];
//     const body = {
//       status: SERVICE_UNAVAILABLE,
//       message: errorMessage
//     };
//
//     fetch.mockReject(body);
//
//     const expectedActions = [
//       {
//         type: SAVE_ORDER_REQUEST,
//         orderDetails,
//         products
//       },
//       {
//         type: SAVE_ORDER_FAIL,
//         errorMessage: `Could not save order. ${errorMessage}`
//       }
//     ];
//
//     const store = mockStore(initialStateOrder);
//
//     const request = store.dispatch(saveOrder(orderDetails, products))
//       .then(() => {
//         expect(store.getActions()).toEqual(expectedActions);
//       });
//
//     expect(fetch).toHaveBeenCalled();
//     // todo check post request body
//
//
//     fetch.mockReject(body);
//     const expectedActionsAfterRetry = [
//       {
//         type: SAVE_ORDER_REQUEST,
//         orderDetails,
//         products
//       },
//       {
//         type: SAVE_ORDER_FAIL,
//         errorMessage: `Could not save order. ${errorMessage}`
//       },
//       {
//         type: SAVE_ORDER_REQUEST,
//         orderDetails,
//         products
//       },
//       {
//         type: SAVE_ORDER_FAIL,
//         errorMessage: `Could not save order. ${errorMessage}`
//       }
//     ];
//     store.dispatch(retrySaveOrder())
//       .then(() => {
//         expect(store.getActions()).toEqual(expectedActionsAfterRetry);
//       });
//
//     expect(fetch).toHaveBeenCalledTimes(2);
//     // todo check post request body
//
//     return request;
//   });
// });