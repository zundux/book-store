import React from "react";
import CartHeader from "./cart-header";

describe("Cart grid header", () => {

  test("Cart header has only the text \"Cart\" when cart is empty", () => {
    const component = shallow(
      <CartHeader products={[]}/>
    );
    matchSnapshot(component);
  });

  test("Header has the word \"product\" when cart has only 1 product", () => {
    const component = shallow(
      <CartHeader products={[
        {
          id: 1,
          amount: 1
        }
      ]}/>
    );
    matchSnapshot(component);
  });

  test("Header has the word \"products\" when cart has a couple of products", () => {
    const component = shallow(
      <CartHeader products={[
        {
          id: 1,
          amount: 1
        },
        {
          id: 2,
          amount: 1
        }
      ]}/>
    );
    matchSnapshot(component);
  });

  test("Header has the word \"products\" when cart contain 2 copies of the product", () => {
    const component = shallow(
      <CartHeader products={[
        {
          id: 1,
          amount: 2
        }
      ]}/>
    );
    matchSnapshot(component);
  });

});

