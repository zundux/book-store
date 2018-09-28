import React from "react";
import CatalogGrid from ".";
import { CatalogProductList, EmptyCatalogLabel } from "./catalog-grid";

describe("Catalog grid", () => {

  test("Catalog grid has no products", () => {
    const products = [];
    const onAddToCart = () => {
    };

    const component = shallow(
      <CatalogGrid {...{
        products,
        onAddToCart
      }}/>
    );
    matchSnapshot(component);
  });

  test("Catalog grid has one products", () => {
    const products = [
      {
        id: 1,
        title: "product 1"
      }
    ];
    const onAddToCart = () => {
    };

    const component = shallow(
      <CatalogGrid {...{
        products,
        onAddToCart
      }}/>
    );
    matchSnapshot(component);
  });

  test("Catalog grid has a couple of products", () => {
    const products = [
      {
        id: 1,
        title: "product 1"
      }, {
        id: 2,
        title: "product 2"
      }
    ];
    const onAddToCart = () => {
    };

    const component = shallow(
      <CatalogGrid {...{
        products,
        onAddToCart
      }}/>
    );
    matchSnapshot(component);
  });


  test("Empty catalog label", () => {
    const component = shallow(
      <EmptyCatalogLabel/>
    );
    matchSnapshot(component);
  });


  test("Catalog product list has a couple of products", () => {
    const products = [
      {
        id: 1,
        title: "product 1"
      }, {
        id: 2,
        title: "product 2"
      }
    ];
    const onAddToCart = () => {
    };

    const component = shallow(
      <CatalogProductList {...{
        products,
        onAddToCart
      }}/>
    );
    matchSnapshot(component);
  });
});