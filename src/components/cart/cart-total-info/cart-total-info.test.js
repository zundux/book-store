import React from "react";
import CartTotalInfo from "./cart-total-info";

describe("Cart total info", () => {

  test("Cart total info for cart without products", () => {
    const products = [];

    const component = shallow(
      <CartTotalInfo {...{
        products
      }}/>
    );
    matchSnapshot(component);
  });

  test("Cart total info for cart with one product", () => {
    const products = [
      {
        id: 1,
        amount: 1,
        volumeInfo: {
          title: "title",
          imageLinks: {
            smallThumbnail: "img-src"
          },
          saleInfo: {
            listPrice: {
              amount: 1,
              currencyCode: "USD"
            },
            country: "EN"
          },
          authors: ["author 1", "author 2"]
        }
      }
    ];

    const component = shallow(
      <CartTotalInfo {...{
        products
      }}/>
    );
    matchSnapshot(component);
  });

  test("Cart total info for cart with a couple copy of product", () => {
    const products = [
      {
        id: 1,
        amount: 2,
        volumeInfo: {
          title: "title",
          imageLinks: {
            smallThumbnail: "img-src"
          },
          saleInfo: {
            listPrice: {
              amount: 1,
              currencyCode: "USD"
            },
            country: "EN"
          },
          authors: ["author 1", "author 2"]
        }
      }
    ];

    const component = shallow(
      <CartTotalInfo {...{
        products
      }}/>
    );
    matchSnapshot(component);
  });

  test("Cart total info for cart with a couple different products", () => {
    const products = [
      {
        id: 1,
        amount: 2,
        volumeInfo: {
          title: "title 1",
          imageLinks: {
            smallThumbnail: "img-src"
          },
          saleInfo: {
            listPrice: {
              amount: 1,
              currencyCode: "USD"
            },
            country: "EN"
          },
          authors: ["author 1", "author 2"]
        }
      }, {
        id: 2,
        amount: 4,
        volumeInfo: {
          title: "title 2",
          imageLinks: {
            smallThumbnail: "img-src 2"
          },
          saleInfo: {
            listPrice: {
              amount: 1,
              currencyCode: "USD"
            },
            country: "EN"
          },
          authors: ["author 3", "author 4"]
        }
      }
    ];

    const component = shallow(
      <CartTotalInfo {...{
        products
      }}/>
    );
    matchSnapshot(component);
  });

});