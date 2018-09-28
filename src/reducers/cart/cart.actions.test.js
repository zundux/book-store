import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { initialStateCart } from "./reducer";
import { ADD_TO_CART, CHANGE_PRODUCT_AMOUNT_IN_CART, CLEAN_CART, REMOVE_FROM_CART } from "./types";
import { addToCart, changeAmountOfProductInCart, cleanCart, removeFromCart } from ".";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Cart actions", () => {
  it("creates ADD_TO_CART when a product creation into cart has been begun", () => {
    const product = { id: 1 };
    const amount = 11;

    const expectedActions = [{
      type: ADD_TO_CART,
      product,
      amount
    }];
    const store = mockStore(initialStateCart);

    store.dispatch(addToCart(product, amount));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("creates REMOVE_FROM_CART when a product removing from cart has been begun", () => {
    const product = { id: 1 };

    const expectedActions = [{
      type: REMOVE_FROM_CART,
      product
    }];
    const store = mockStore(initialStateCart);

    store.dispatch(removeFromCart(product));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("creates CLEAN_CART when the cart clearing has been begun", () => {
    const expectedActions = [{
      type: CLEAN_CART
    }];
    const store = mockStore(initialStateCart);

    store.dispatch(cleanCart());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("creates CHANGE_PRODUCT_AMOUNT_IN_CART when changing amount of the product into cart has been begun", () => {
    const product = { id: 1 };
    const amount = 11;

    const expectedActions = [{
      type: CHANGE_PRODUCT_AMOUNT_IN_CART,
      product,
      amount
    }];
    const store = mockStore({ products: [{ id: 1, amount: 2 }] });

    store.dispatch(changeAmountOfProductInCart(product, amount));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("creates CHANGE_PRODUCT_AMOUNT_IN_CART when changing amount of the product into cart has been begun and was sent wrong amount value (not integer)", () => {
    const product = { id: 1 };
    const amount = "11";
    const expectedAmount = 1;

    const expectedActions = [{
      type: CHANGE_PRODUCT_AMOUNT_IN_CART,
      product,
      amount: expectedAmount
    }];
    const store = mockStore({ products: [{ id: 1, amount: 2 }] });

    store.dispatch(changeAmountOfProductInCart(product, amount));
    expect(store.getActions()).toEqual(expectedActions);
  });
});