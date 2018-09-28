import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import { addToCart } from "../../../reducers/cart";
import { fetchProduct } from "../../../reducers/product";
import ProductDetails from "../../../components/product-details";
import LoadingLabel from "../../../components/loading-label";
import ErrorLabel from "../../../components/error-label";
import { Link } from "react-router-dom";

export class Product extends Component {
  componentDidMount() {
    this.props.onFetchProduct(this.props.match.params.id);
  }

  render() {
    let { product, isFetching, errorMessage, onAddToCart } = this.props;

    return (
      <div>
        {!isFetching && !errorMessage && product && (
          <ProductDetails {...{
            product,
            onAddToCart
          }}/>
        )}
        {!isFetching && errorMessage && (
          <ErrorLabel message={`Product not found. ${errorMessage}`}>
            <Link to="/">Back to catalog</Link>
          </ErrorLabel>
        )}
        {isFetching && (
          <LoadingLabel message="Product loading, please wait"/>
        )}
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.object,
  product: PropTypes.object,
  isFetching: PropTypes.bool,
  errorMessage: PropTypes.string,
  onAddToCart: PropTypes.func,
  onFetchProduct: PropTypes.func
};

const mapStateToProps = ({ product }) => ({
  product: product.product,
  isFetching: product.isFetching,
  errorMessage: product.errorMessage
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onAddToCart: addToCart,
  onFetchProduct: fetchProduct
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
