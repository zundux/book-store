import React from "react";
import CatalogGridItem, { AmountSelector, AuthorsList, AuthorsListItem, Price } from "./catalog-grid-item";

describe("Catalog grid item", () => {

  test("Catalog grid item", () => {
    const product = {
      id: 11,
      volumeInfo: {
        title: "title",
        imageLinks: {
          smallThumbnail: "img-src"
        },
        authors: ["author 1", "author 2"]
      },
      saleInfo: {
        listPrice: {
          amount: 1,
          currencyCode: "USD"
        },
        country: "EN"
      }
    };
    const onAddToCart = () => {
    };

    const component = shallow(
      <CatalogGridItem {...{
        product,
        onAddToCart
      }}/>
    );
    matchSnapshot(component);
  });


  test("Product amount selector", () => {
    const product = {
      id: 11,
      amount: 1
    };
    const options = [1, 2, 3, 4, 5, 10, 25, 50, 100];
    const onAddToCart = jest.fn();

    const component = shallow(
      <AmountSelector {...{
        product,
        options,
        onAddToCart
      }}/>
    );
    matchSnapshot(component);

    const mountedComponent = mount(
      <AmountSelector {...{
        product,
        options,
        onAddToCart
      }}/>
    );

    const defaultSelectedOptionValue = 1;
    const amountSelect = mountedComponent.find("select[name=\"amount\"]");
    expect(amountSelect.children().length).toBe(options.length);
    mountedComponent.find(".add-to-cart").simulate("click");
    expect(onAddToCart).toHaveBeenCalled();
    expect(onAddToCart).toBeCalledWith(product, defaultSelectedOptionValue);
  });


  test("Product price EUR", () => {
    const saleInfo = {
      listPrice: {
        amount: 1,
        currencyCode: "EUR"
      },
      country: "FR"
    };

    const component = shallow(
      <Price {...{
        saleInfo
      }}/>
    );
    matchSnapshot(component);
  });

  test("Product price USD", () => {
    const saleInfo = {
      listPrice: {
        amount: 2,
        currencyCode: "USD"
      },
      country: "EN"
    };

    const component = shallow(
      <Price {...{
        saleInfo
      }}/>
    );
    matchSnapshot(component);
  });


  test("Authors list - no authors", () => {
    const authors = [];

    const component = shallow(
      <AuthorsList {...{
        authors
      }}/>
    );
    matchSnapshot(component);
  });

  test("Authors list - one author", () => {
    const authors = ["author 1"];

    const component = shallow(
      <AuthorsList {...{
        authors
      }}/>
    );
    matchSnapshot(component);
  });

  test("Authors list - a couple of authors", () => {
    const authors = ["author 1", "author 2"];

    const component = shallow(
      <AuthorsList {...{
        authors
      }}/>
    );
    matchSnapshot(component);
  });

  test("Authors list - a lot of authors", () => {
    const authors = [
      "author 1", "author 2", "author 3", "author 4",
      "author 5", "author 6", "author 7", "author 8",
      "author 9", "author 10", "author 11", "author 12",
      "author 13", "author 14", "author 15", "author 16",
      "author 17", "author 18", "author 19", "author 20"
    ];

    const component = shallow(
      <AuthorsList {...{
        authors
      }}/>
    );
    matchSnapshot(component);
  });


  test("Authors list item", () => {
    const author = "author 1";
    const authorIndex = 1;

    const component = shallow(
      <AuthorsListItem {...{
        author,
        authorIndex
      }}/>
    );
    matchSnapshot(component);
  });

});