import React from "react";
import CartGridItem from "./cart-grid-item";
import { Link } from "react-router-dom";
import * as R from "ramda";

export const ProductList = ({ products, onRemoveFromCart, onChangeAmountOfProductInCart }) =>
  products.map((product, productIndex) => (
    <CartGridItem
      key={productIndex}
      product={product}
      onRemoveFromCart={onRemoveFromCart}
      onChangeAmountOfProductInCart={onChangeAmountOfProductInCart}
    />
  ));

export const EmptyCartLabel = () => (
  <div>
    <p>Cart is empty</p>
    <p>Add products from <Link to="/">catalog</Link></p>
  </div>
);

const CartGrid = ({ products, onRemoveFromCart, onChangeAmountOfProductInCart }) => (
  R.ifElse(
    R.isEmpty,
    () => (
      <EmptyCartLabel/>
    ),
    () => (
      <ProductList {...{
        products,
        onRemoveFromCart,
        onChangeAmountOfProductInCart
      }}/>
    )
  )(products)
);

export default CartGrid;