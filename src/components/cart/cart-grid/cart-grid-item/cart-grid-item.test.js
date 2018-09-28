import React from "react";
import CartGridItem, { AmountSelector, AuthorsList, AuthorsListItem, Price } from "./cart-grid-item";

describe("Cart grid item", () => {

  test("Cart grid item", () => {
    const product = {
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
    const onRemoveFromCart = jest.fn();
    const onChangeAmountOfProductInCart = () => {
    };

    const component = shallow(
      <CartGridItem {...{
        product,
        onRemoveFromCart,
        onChangeAmountOfProductInCart
      }}/>
    );
    matchSnapshot(component);

    component.find(".remove-product").simulate("click");
    expect(onRemoveFromCart).toHaveBeenCalled();
    expect(onRemoveFromCart).toBeCalledWith(product);
  });


  test("Product amount selector", () => {
    const product = {
      amount: 1
    };
    const onChangeAmountOfProductInCart = jest.fn();

    const component = shallow(
      <AmountSelector {...{
        product,
        onChangeAmountOfProductInCart
      }}/>
    );
    matchSnapshot(component);

    component.find(".decrease").simulate("click");
    expect(onChangeAmountOfProductInCart).toHaveBeenCalled();
    expect(onChangeAmountOfProductInCart).toBeCalledWith(product, product.amount - 1);

    component.find(".increase").simulate("click");
    expect(onChangeAmountOfProductInCart.mock.calls.length).toEqual(2);
    expect(onChangeAmountOfProductInCart).toBeCalledWith(product, product.amount + 1);

    const amountField = component.find("[name=\"amount\"]");
    expect(amountField.props().value).toBe(1);
    const exactAmount = 13;
    const changeEvent = { target: { name: "amount", value: exactAmount } };
    amountField.simulate("change", changeEvent);
    expect(onChangeAmountOfProductInCart.mock.calls.length).toEqual(3);
    expect(onChangeAmountOfProductInCart).toBeCalledWith(product, exactAmount);
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