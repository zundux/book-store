import React from "react";
import CartGrid, { EmptyCartLabel, ProductList } from "./cart-grid";

describe("Cart grid", () => {

  test("Cart grid has no products", () => {
    const products = [];
    const onRemoveFromCart = () => {
    };
    const onChangeAmountOfProductInCart = () => {
    };

    const component = shallow(
      <CartGrid {...{
        products,
        onRemoveFromCart,
        onChangeAmountOfProductInCart
      }}/>
    );
    matchSnapshot(component);
  });

  test("Cart grid has one products", () => {
    const products = [
      {
        id: 1,
        title: "product 1"
      }
    ];
    const onRemoveFromCart = () => {
    };
    const onChangeAmountOfProductInCart = () => {
    };

    const component = shallow(
      <CartGrid {...{
        products,
        onRemoveFromCart,
        onChangeAmountOfProductInCart
      }}/>
    );
    matchSnapshot(component);
  });

  test("Cart grid has a couple of products", () => {
    const products = [
      {
        id: 1,
        title: "product 1"
      }, {
        id: 2,
        title: "product 2"
      }
    ];
    const onRemoveFromCart = () => {
    };
    const onChangeAmountOfProductInCart = () => {
    };

    const component = shallow(
      <CartGrid {...{
        products,
        onRemoveFromCart,
        onChangeAmountOfProductInCart
      }}/>
    );
    matchSnapshot(component);
  });


  test("Empty cart label", () => {
    const component = shallow(
      <EmptyCartLabel/>
    );
    matchSnapshot(component);
  });


  test("Product list has a couple of products", () => {
    const products = [
      {
        id: 1,
        title: "product 1"
      }, {
        id: 2,
        title: "product 2"
      }
    ];
    const onRemoveFromCart = () => {
    };
    const onChangeAmountOfProductInCart = () => {
    };

    const component = shallow(
      <ProductList {...{
        products,
        onRemoveFromCart,
        onChangeAmountOfProductInCart
      }}/>
    );
    matchSnapshot(component);
  });
});