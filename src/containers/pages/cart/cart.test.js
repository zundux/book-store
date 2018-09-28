import React from "react";
import { Cart } from "./cart";

describe("Cart page", () => {

  it("Cart page should not show checkout link when cart is empty", () => {
    const products = [];
    const onRemoveFromCart = () => {
    };
    const onChangeAmountOfProductInCart = () => {
    };

    const component = shallow(
      <Cart {...{
        products,
        onRemoveFromCart,
        onChangeAmountOfProductInCart
      }}/>
    );
    matchSnapshot(component);
    // todo check page header
    // todo check page title
    // todo should NOT have the checkout button
  });

  it("Cart page should show the checkout link when cart has some products or one", () => {
    const products = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const onRemoveFromCart = () => {
    };
    const onChangeAmountOfProductInCart = () => {
    };

    const component = shallow(
      <Cart {...{
        products,
        onRemoveFromCart,
        onChangeAmountOfProductInCart
      }}/>
    );
    matchSnapshot(component);
    // todo check page header
    // todo check page title
    // todo should HAVE the checkout button
  });
});