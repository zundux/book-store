import React from "react";
import * as R from "ramda";

const CartHeader = ({ products }) => {
  const amount = R.ifElse(
    R.either(R.isNil, R.isEmpty),
    R.always(0),
    R.pipe(
      R.pluck("amount"),
      R.sum
    )
  )(products);

  const hasMultipleProductsInCart = amount > 1;
  const isNotEmpty = !R.either(R.isNil, R.isEmpty)(products);

  return (
    <div>
      <h1>Cart</h1>
      {isNotEmpty && (
        <div>
          {amount} product{hasMultipleProductsInCart ? "s" : ""} in cart
        </div>
      )}
    </div>
  );
};

export default CartHeader;