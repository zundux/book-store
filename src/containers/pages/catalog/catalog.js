import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CatalogHeader from "../../../components/catalog/catalog-header";
import CatalogGrid from "../../../components/catalog/catalog-grid/catalog-grid";
import { addToCart } from "../../../reducers/cart";
import { fetchProducts } from "../../../reducers/catalog";
import ErrorLabel from "../../../components/error-label";
import LoadingLabel from "../../../components/loading-label";

export class Catalog extends React.Component {
  componentDidMount() {
    this.props.onFetchProducts();
  }

  render() {
    const {
      isFetching,
      products,
      totalItems,
      productsInCart,
      errorMessage,
      onAddToCart
    } = this.props;

    return (
      <div>
        {!isFetching && !errorMessage && products.length && (
          <div>
            <CatalogHeader productsInCart={productsInCart}/>
            {/* todo search bar */}
            <CatalogGrid
              products={products}
              onAddToCart={onAddToCart}
            />
            {totalItems && (
              <p>Found {totalItems} item{totalItems > 1 ? "s" : ""}</p>
            )}
            {/* todo pagination*/}
          </div>
        )}
        {!isFetching && errorMessage && (
          <ErrorLabel message={errorMessage}/>
        )}
        {isFetching && (
          <LoadingLabel message="Catalog loading, please wait"/>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ catalog, cart }) => ({
  products: catalog.products,
  totalItems: catalog.totalItems,
  errorMessage: catalog.errorMessage,
  isFetching: catalog.isFetching,
  productsInCart: cart.products
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onAddToCart: addToCart,
  onFetchProducts: fetchProducts
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Catalog);