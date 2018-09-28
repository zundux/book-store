import React from "react";
import * as R from "ramda";

export const AuthorsListItem = (author, authorIndex) => (
  <li key={authorIndex}>
    {author}
  </li>
);

export const AuthorsList = ({ authors }) => {
  const hasAuthors = R.propSatisfies(length => length > 0, "length", authors);
  const authorsList = (
    <ul>
      {authors.map(AuthorsListItem)}
    </ul>
  );
  const noInformationLabel = (
    <p>
      no information
    </p>
  );
  const hasMultipleAuthors = R.propSatisfies(length => length > 1, "length", authors);
  const authorLabel = `Author${hasMultipleAuthors ? "s" : ""}`;

  return (
    <div>
      <p>{authorLabel}:</p>
      {hasAuthors ? authorsList : noInformationLabel}
    </div>
  );
};

export const Price = ({ saleInfo }) => {
  const amount = R.path(["listPrice", "amount"], saleInfo);
  const currencyCode = R.pathOr("USD", ["listPrice", "currencyCode"], saleInfo);
  const country = R.propOr("US", "country", saleInfo);
  const l10nCurrency = new Intl.NumberFormat(country,
    { style: "currency", currency: currencyCode });
  const price = l10nCurrency.format(amount);

  return (
    <div>
      {amount && (
        <span>{price}</span>
      )}
      {!amount && (
        <span>Free</span>
      )}
    </div>
  );
};

export const AmountSelector = ({ product, onChangeAmountOfProductInCart }) => {
  const onIncreaseAmount = () =>
    onChangeAmountOfProductInCart(product, product.amount + 1);
  const onDecreaseAmount = () =>
    onChangeAmountOfProductInCart(product, product.amount - 1);
  const onChangeAmount = event => {
    const amount = parseInt(event.target.value, 10);
    onChangeAmountOfProductInCart(product, amount);
  };

  return (
    <div>
      <button className="decrease" onClick={onDecreaseAmount}>-</button>
      <input
        name="amount"
        type="number"
        value={product.amount}
        onChange={onChangeAmount}
      />
      <button className="increase" onClick={onIncreaseAmount}>+</button>
    </div>
  );
};

const CartGridItem = ({ product, onRemoveFromCart, onChangeAmountOfProductInCart }) => {
  const title = R.pathOr("", ["volumeInfo", "title"], product);
  const imageUrl = R.pathOr("", ["volumeInfo", "imageLinks", "smallThumbnail"], product);
  const authors = R.pathOr("", ["volumeInfo", "authors"], product);
  const saleInfo = R.prop("saleInfo", product);

  return (
    <div>
      <img src={imageUrl} alt={title}/>
      <p>
        <strong>
          {title}
        </strong>
      </p>
      <AuthorsList authors={authors}/>
      <Price saleInfo={saleInfo}/>
      <AmountSelector {...{
        product,
        onChangeAmountOfProductInCart
      }}
      />
      <button className="remove-product" onClick={() => onRemoveFromCart(product)}>
        Remove from cart
      </button>
    </div>
  );
};

export default CartGridItem;