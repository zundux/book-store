import * as types from "./types";
import reducer from ".";

describe("cart reducers", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      products: []
    });
  });

  it("should add a product to the cart " +
    "(case ADD_TO_CART)", () => {
    expect(reducer(
      {
        products: [
          { id: 1, title: "book 1", amount: 1 },
          { id: 2, title: "book 2", amount: 1 },
          { id: 3, title: "book 3", amount: 1 },
          { id: 4, title: "book 4", amount: 1 },
          { id: 5, title: "book 5", amount: 1 }
        ]
      },
      {
        type: types.ADD_TO_CART,
        product: { id: 6, title: "book 6" }
      }
    )).toEqual({
      products: [
        { id: 1, title: "book 1", amount: 1 },
        { id: 2, title: "book 2", amount: 1 },
        { id: 3, title: "book 3", amount: 1 },
        { id: 4, title: "book 4", amount: 1 },
        { id: 5, title: "book 5", amount: 1 },
        { id: 6, title: "book 6", amount: 1 }
      ]
    });
  });

  it("should increase the amount of the exist product " +
    "when the product has been added to the cart again " +
    "(case ADD_TO_CART)", () => {
    expect(reducer(
      {
        products: [
          { id: 1, title: "book 1", amount: 1 },
          { id: 2, title: "book 2", amount: 1 },
          { id: 3, title: "book 3", amount: 1 },
          { id: 4, title: "book 4", amount: 1 },
          { id: 5, title: "book 5", amount: 1 }
        ]
      },
      {
        type: types.ADD_TO_CART,
        product: { id: 1, title: "book 1" }
      }
    )).toEqual({
      products: [
        { id: 1, title: "book 1", amount: 2 },
        { id: 2, title: "book 2", amount: 1 },
        { id: 3, title: "book 3", amount: 1 },
        { id: 4, title: "book 4", amount: 1 },
        { id: 5, title: "book 5", amount: 1 }
      ]
    });
  });

  it("should add a few instances of product to the cart " +
    "(case ADD_TO_CART)", () => {
    expect(reducer(
      {
        products: [
          { id: 1, title: "book 1", amount: 1 },
          { id: 2, title: "book 2", amount: 1 },
          { id: 3, title: "book 3", amount: 1 },
          { id: 4, title: "book 4", amount: 1 },
          { id: 5, title: "book 5", amount: 1 }
        ]
      },
      {
        type: types.ADD_TO_CART,
        product: { id: 6, title: "book 6" },
        amount: 6
      }
    )).toEqual({
      products: [
        { id: 1, title: "book 1", amount: 1 },
        { id: 2, title: "book 2", amount: 1 },
        { id: 3, title: "book 3", amount: 1 },
        { id: 4, title: "book 4", amount: 1 },
        { id: 5, title: "book 5", amount: 1 },
        { id: 6, title: "book 6", amount: 6 }
      ]
    });
  });

  it("should increase the amount of the exist product " +
    "by the specified amount " +
    "when in the cart there are exist same products " +
    "(case ADD_TO_CART)", () => {
    expect(reducer(
      {
        products: [
          { id: 1, title: "book 1", amount: 1 },
          { id: 2, title: "book 2", amount: 1 },
          { id: 3, title: "book 3", amount: 1 },
          { id: 4, title: "book 4", amount: 1 },
          { id: 5, title: "book 5", amount: 1 }
        ]
      },
      {
        type: types.ADD_TO_CART,
        product: { id: 1, title: "book 1" },
        amount: 5
      }
    )).toEqual({
      products: [
        { id: 1, title: "book 1", amount: 6 },
        { id: 2, title: "book 2", amount: 1 },
        { id: 3, title: "book 3", amount: 1 },
        { id: 4, title: "book 4", amount: 1 },
        { id: 5, title: "book 5", amount: 1 }
      ]
    });
  });


  it("should remove exist product from the cart " +
    "(case REMOVE_FROM_CART)", () => {
    expect(reducer(
      {
        products: [
          { id: 1, title: "book 1", amount: 1 },
          { id: 2, title: "book 2", amount: 1 },
          { id: 3, title: "book 3", amount: 1 },
          { id: 4, title: "book 4", amount: 1 },
          { id: 5, title: "book 5", amount: 1 }
        ]
      },
      {
        type: types.REMOVE_FROM_CART,
        product: { id: 1, title: "book 1" }
      }
    )).toEqual({
      products: [
        { id: 2, title: "book 2", amount: 1 },
        { id: 3, title: "book 3", amount: 1 },
        { id: 4, title: "book 4", amount: 1 },
        { id: 5, title: "book 5", amount: 1 }
      ]
    });
  });

  it("should do nothing " +
    "when remove the non-exist product from the cart " +
    "(case REMOVE_FROM_CART)", () => {
    expect(reducer(
      {
        products: [
          { id: 1, title: "book 1", amount: 1 },
          { id: 2, title: "book 2", amount: 1 },
          { id: 3, title: "book 3", amount: 1 },
          { id: 4, title: "book 4", amount: 1 },
          { id: 5, title: "book 5", amount: 1 }
        ]
      },
      {
        type: types.REMOVE_FROM_CART,
        product: { id: 6, title: "book 6" }
      }
    )).toEqual({
      products: [
        { id: 1, title: "book 1", amount: 1 },
        { id: 2, title: "book 2", amount: 1 },
        { id: 3, title: "book 3", amount: 1 },
        { id: 4, title: "book 4", amount: 1 },
        { id: 5, title: "book 5", amount: 1 }
      ]
    });
  });


  it("should change the amount of the exist product in cart " +
    "(case CHANGE_PRODUCT_AMOUNT_IN_CART)", () => {
    expect(reducer(
      {
        products: [
          { id: 1, title: "book 1", amount: 1 },
          { id: 2, title: "book 2", amount: 1 },
          { id: 3, title: "book 3", amount: 1 },
          { id: 4, title: "book 4", amount: 1 },
          { id: 5, title: "book 5", amount: 1 }
        ]
      },
      {
        type: types.CHANGE_PRODUCT_AMOUNT_IN_CART,
        product: { id: 1, title: "book 1" },
        amount: 6
      }
    )).toEqual({
      products: [
        { id: 1, title: "book 1", amount: 6 },
        { id: 2, title: "book 2", amount: 1 },
        { id: 3, title: "book 3", amount: 1 },
        { id: 4, title: "book 4", amount: 1 },
        { id: 5, title: "book 5", amount: 1 }
      ]
    });
  });

  it("should do nothing on change the amount of the non-exist product in cart " +
    "(case CHANGE_PRODUCT_AMOUNT_IN_CART)", () => {
    expect(reducer(
      {
        products: [
          { id: 1, title: "book 1", amount: 1 },
          { id: 2, title: "book 2", amount: 1 },
          { id: 3, title: "book 3", amount: 1 },
          { id: 4, title: "book 4", amount: 1 },
          { id: 5, title: "book 5", amount: 1 }
        ]
      },
      {
        type: types.CHANGE_PRODUCT_AMOUNT_IN_CART,
        product: { id: 6, title: "book 6" },
        amount: 6
      }
    )).toEqual({
      products: [
        { id: 1, title: "book 1", amount: 1 },
        { id: 2, title: "book 2", amount: 1 },
        { id: 3, title: "book 3", amount: 1 },
        { id: 4, title: "book 4", amount: 1 },
        { id: 5, title: "book 5", amount: 1 }
      ]
    });
  });
});
