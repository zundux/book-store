import { initialStateOrder } from "./reducer";
import reducer from ".";
import * as types from "./types";
import { errorMessage, saveOrderData } from "./mock";

describe("order reducers", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialStateOrder);
  });

  it("should save the order info" +
    "(case SAVE_ORDER_REQUEST)", () => {
    expect(reducer(
      initialStateOrder,
      {
        type: types.SAVE_ORDER_REQUEST,
        ...saveOrderData
      }
    )).toEqual({
      ...initialStateOrder,
      ...saveOrderData,
      isSending: true
    });
  });

  it("should set the saved order id and reset other info" +
    "(case SAVE_ORDER_SUCCESS)", () => {
    expect(reducer(
      {
        ...initialStateOrder,
        isSending: true,
        errorMessage: "some error"
      },
      {
        type: types.SAVE_ORDER_SUCCESS,
        id: 1
      }
    )).toEqual({
      ...initialStateOrder,
      id: 1,
      isSending: false,
      errorMessage: null
    });
  });

  it("should set a error message on fail save the order " +
    "(case SAVE_ORDER_FAIL)", () => {
    expect(reducer(
      {
        ...initialStateOrder,
        isSending: true,
        errorMessage: null
      },
      {
        type: types.SAVE_ORDER_FAIL,
        errorMessage
      }
    )).toEqual({
      ...initialStateOrder,
      isSending: false,
      errorMessage
    });
  });

});
