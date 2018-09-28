import React from "react";
import * as R from "ramda";
import { Link } from "react-router-dom";

const CatalogHeader = ({ productsInCart }) => {
  const amount = R.ifElse(
    R.isEmpty,
    R.always(0),
    R.pipe(
      R.pluck("amount"),
      R.sum
    )
  )(productsInCart);

  const hasMultipleProductsInCart = amount > 1;
  const isNotEmpty = !R.either(R.isNil, R.isEmpty)(productsInCart);

  return (
    <div>
      <h1>Catalog</h1>
      {isNotEmpty && (
        <div>
          <Link to="/cart">
            {amount} product{hasMultipleProductsInCart ? "s" : ""} in cart
          </Link>
        </div>
      )}
    </div>
  );
};

export default CatalogHeader;