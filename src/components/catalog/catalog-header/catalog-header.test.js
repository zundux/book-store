import React from "react";
import CatalogHeader from "./catalog-header";

describe("Catalog grid header", () => {

  test("Catalog header has not only the text \"Catalog\" when catalog is empty", () => {
    const component = shallow(
      <CatalogHeader productsInCart={[]}/>
    );
    matchSnapshot(component);
  });

  test("Header has the word \"product\" when cart has only 1 product", () => {
    const component = shallow(
      <CatalogHeader productsInCart={[
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
      <CatalogHeader productsInCart={[
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
      <CatalogHeader productsInCart={[
        {
          id: 1,
          amount: 2
        }
      ]}/>
    );
    matchSnapshot(component);
  });

});

