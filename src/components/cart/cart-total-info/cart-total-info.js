import React from "react";
import * as R from "ramda";

const CartTotalInfo = ({ products }) => {
  const isNotEmpty = !R.either(R.isNil, R.isEmpty)(products);
  const itemPriceLens = R.lensPath(["saleInfo", "listPrice", "amount"]);
  const itemAmountLens = R.lensProp("amount");

  const totalPrice = R.pipe(
    R.map(item => R.defaultTo(1, R.view(itemPriceLens, item)) *
      R.defaultTo(1, R.view(itemAmountLens, item))
    ),
    R.sum
  )(products);

  const firstProduct = R.head(products);
  const currencyCode = R.pathOr("USD",
    ["saleInfo", "listPrice", "currencyCode"], firstProduct);
  const country = R.pathOr("US", ["saleInfo", "country"], firstProduct);
  const l10nCurrency = new Intl.NumberFormat(country,
    { style: "currency", currency: currencyCode });

  const totalPriceLabel = l10nCurrency.format(totalPrice);

  return isNotEmpty && (
    <h2>Total: {totalPriceLabel}</h2>
  );
};

export default CartTotalInfo;