import React from "react";
import { OrderCreated } from "./order-created";

describe("Order created page", () => {

  it("Order created page should not show success message by default", () => {
    const orderId = 11;

    const component = shallow(
      <OrderCreated {...{
        orderId
      }}/>
    );
    matchSnapshot(component);
    // todo check page header
    // todo check page title
  });

  it("Order page should show error message if something went wrong", () => {
    const orderId = null;

    const component = shallow(
      <OrderCreated {...{
        orderId
      }}/>
    );
    matchSnapshot(component);
    // todo check page header
    // todo check page title
  });
});