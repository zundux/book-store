import React from "react";
import { Product } from "./product";

describe("Product page", () => {

  it("calls loadProduct when the site has been loaded at first time " +
    "and show loading label", () => {
    const id = 11;
    const match = { params: { id } };
    const product = null;
    const isFetching = true;
    const errorMessage = null;
    const onAddToCart = () => {
    };
    const onFetchProduct = jest.fn();

    const component = shallow(
      <Product {...{
        match,
        product,
        isFetching,
        errorMessage,
        onAddToCart,
        onFetchProduct
      }}/>
    );
    matchSnapshot(component);

    expect(onFetchProduct).toHaveBeenCalled();
    expect(onFetchProduct).toHaveBeenCalledWith(id);
  });

  it("should show product by default", () => {
    const match = { params: { id: 11 } };
    const product = { id: 11 };
    const isFetching = false;
    const errorMessage = null;
    const onAddToCart = () => {
    };
    const onFetchProduct = jest.fn();

    const component = shallow(
      <Product {...{
        match,
        product,
        isFetching,
        errorMessage,
        onAddToCart,
        onFetchProduct
      }}/>
    );
    matchSnapshot(component);
    // todo check page header
    // todo check page title
  });

  it("should show error message if the product not found", () => {
    const match = { params: { id: null } };
    const product = null;
    const isFetching = false;
    const errorMessage = "some error";
    const onAddToCart = () => {
    };
    const onFetchProduct = jest.fn();

    const component = shallow(
      <Product {...{
        match,
        product,
        isFetching,
        errorMessage,
        onAddToCart,
        onFetchProduct
      }}/>
    );
    matchSnapshot(component);
    // todo check page header
    // todo check page title
  });
});