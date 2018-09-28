import React from "react";
import { Order } from "./order";

describe("Order page", () => {

  it("Order page should not show error message by default", () => {
    const products = [];
    const errorMessage = null;
    const onSaveOrder = () => {
    };
    const onRetrySaveOrder = () => {
    };

    const component = shallow(
      <Order {...{
        products,
        errorMessage,
        onSaveOrder,
        onRetrySaveOrder
      }}/>
    );
    matchSnapshot(component);
    // todo check page header
    // todo check page title
  });

  it("Order page should show error message if something went wrong", () => {
    const errorMessage = "some error message";
    const products = [];
    const onSaveOrder = () => {
    };
    const onRetrySaveOrder = () => {
    };

    const component = shallow(
      <Order {...{
        products,
        errorMessage,
        onSaveOrder,
        onRetrySaveOrder
      }}/>
    );
    matchSnapshot(component);
    // todo check page header
    // todo check page title
  });
});