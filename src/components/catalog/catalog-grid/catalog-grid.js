import React from "react";
import * as R from "ramda";
import CatalogGridItem from "./catalog-grid-item";

export const CatalogProductList = ({ products, onAddToCart }) =>
  products.map((product, productIndex) => (
    <CatalogGridItem
      key={productIndex}
      product={product}
      onAddToCart={onAddToCart}
    />
  ));

export const EmptyCatalogLabel = () => (
  <div>
    <p>Nothing found</p>
  </div>
);

const CatalogGrid = ({ products, onAddToCart }) =>
  R.ifElse(
    R.isEmpty,
    () => (
      <EmptyCatalogLabel/>
    ),
    () => (
      <CatalogProductList {...{
        products,
        onAddToCart
      }}/>
    )
  )(products);

export default CatalogGrid;