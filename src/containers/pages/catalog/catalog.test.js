import React from "react";
import { Catalog } from "./catalog";

describe("Catalog page", () => {

  it("calls loadProducts when the site has been loaded at first time " +
    "and show loading label", () => {
    const products = [];
    const isFetchingProducts = true;
    const errorMessage = null;
    const totalItems = null;
    const productsInCart = [];
    const onAddToCart = () => {
    };
    const onFetchProducts = jest.fn();

    const component = shallow(
      <Catalog {...{
        products,
        isFetchingProducts,
        errorMessage,
        totalItems,
        productsInCart,
        onAddToCart,
        onFetchProducts
      }}/>
    );
    matchSnapshot(component);

    expect(onFetchProducts).toHaveBeenCalled();
    // todo with search params
    // expect(onFetchProduct).toHaveBeenCalledWith(params);
    //// todo should NOT have the pagination
    // todo should NOT have the total items label
  });

  it("should show product list ", () => {
    const products = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const isFetchingProducts = false;
    const errorMessage = null;
    const totalItems = 101;
    const productsInCart = [];
    const onAddToCart = () => {
    };
    const onFetchProducts = () => {
    };

    const component = shallow(
      <Catalog {...{
        products,
        isFetchingProducts,
        errorMessage,
        totalItems,
        productsInCart,
        onAddToCart,
        onFetchProducts
      }}/>
    );
    matchSnapshot(component);
    // todo check page header
    // todo check page title
    //// todo should have the pagination
    // todo should have the total items label
  });

  it("should show error message label if the products not found", () => {
    const products = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const isFetchingProducts = false;
    const errorMessage = null;
    const totalItems = null;
    const productsInCart = [];
    const onAddToCart = () => {
    };
    const onFetchProducts = () => {
    };

    const component = shallow(
      <Catalog {...{
        products,
        isFetchingProducts,
        errorMessage,
        totalItems,
        productsInCart,
        onAddToCart,
        onFetchProducts
      }}/>
    );
    matchSnapshot(component);
    // todo check page header
    // todo check page title
    //// todo should HAVE the pagination
    // todo should HAVE the total items label
  });
});