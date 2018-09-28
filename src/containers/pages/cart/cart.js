import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CartHeader from "../../../components/cart/cart-header";
import CartGrid from "../../../components/cart/cart-grid";
import { changeAmountOfProductInCart, removeFromCart } from "../../../reducers/cart";
import CartTotalInfo from "../../../components/cart/cart-total-info";
import { Link } from "react-router-dom";
import * as R from "ramda";

export const Cart = ({ products, onRemoveFromCart, onChangeAmountOfProductInCart }) => {
  const isNotEmpty = !R.either(R.isNil, R.isEmpty)(products);

  return (
    <div>
      <CartHeader products={products}/>
      <CartGrid {...{
        products,
        onRemoveFromCart,
        onChangeAmountOfProductInCart
      }}/>
      <CartTotalInfo {...{ products }}/>
      {isNotEmpty && (
        <button>
          <Link to="/order">Checkout</Link>
        </button>
      )}
    </div>
  );
};

const mapStateToProps = ({ cart }) => ({
  products: cart.products
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onRemoveFromCart: removeFromCart,
  onChangeAmountOfProductInCart: changeAmountOfProductInCart
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);