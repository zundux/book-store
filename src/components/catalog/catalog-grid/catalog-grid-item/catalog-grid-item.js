import React from "react";
import * as R from "ramda";
import { Link } from "react-router-dom";

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
  const price = R.path(["listPrice", "amount"], saleInfo);
  const currencyCode = R.pathOr("USD", ["listPrice", "currencyCode"], saleInfo);
  const country = R.propOr("US", "country", saleInfo);
  const l10nCurrency = new Intl.NumberFormat(country,
    { style: "currency", currency: currencyCode });
  const priceLabel = l10nCurrency.format(price);

  return (
    <p>
      {price && (
        <span>{priceLabel}</span>
      )}
    </p>
  );
};

export const AmountSelector = ({ product, options = [1, 2, 3, 4, 5, 10, 25, 50, 100], onAddToCart }) => {
  let amountRef = React.createRef();
  const onAddProductToCart = () => {
    onAddToCart(product, +amountRef.current.value);
    amountRef.current.value = 1;
  };
  const renderOption = (option, optionIndex) => (
    <option key={optionIndex} value={option}>{option}</option>
  );

  return (
    <React.Fragment>
      <select ref={amountRef} name="amount" defaultValue={1}>
        {options.map(renderOption)}
      </select>
      <button className="add-to-cart" onClick={onAddProductToCart}>Add to cart</button>
    </React.Fragment>
  );
};

const CatalogGridItem = ({ product, onAddToCart }) => {
  const title = R.pathOr("", ["volumeInfo", "title"], product);
  const imageUrl = R.pathOr("", ["volumeInfo", "imageLinks", "smallThumbnail"], product);
  const authors = R.pathOr("", ["volumeInfo", "authors"], product);
  const saleInfo = R.prop("saleInfo", product);
  const id = R.prop("id", product);
  const productPageUrl = `/product/${id}`;

  return (
    <div>
      <Link to={productPageUrl}>
        <img src={imageUrl} alt={title}/>
      </Link>
      <Link to={productPageUrl}>
        <strong>
          {title}
        </strong>
      </Link>
      <AuthorsList authors={authors}/>
      <Price saleInfo={saleInfo}/>
      <AmountSelector {...{ product, onAddToCart }}/>
    </div>
  );
};

export default CatalogGridItem;