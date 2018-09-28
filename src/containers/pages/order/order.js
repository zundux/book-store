import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import OrderDetailsForm from "./order-details-form";
import { retrySaveOrder, saveOrder } from "../../../reducers/order";
import { initialValuesOfOrderDetailsForm, validateOrderDetails } from "../../../reducers/order-details";
import ErrorLabel from "../../../components/error-label";

export const Order = ({ errorMessage, products, onSaveOrder, onRetrySaveOrder }) => {
  const onSubmit = formValues => onSaveOrder(formValues, products);

  return (
    <div>
      <h1>Order details</h1>
      <OrderDetailsForm
        onSubmit={onSubmit}
        initialValues={initialValuesOfOrderDetailsForm}
        validate={validateOrderDetails}
      />
      {errorMessage && (
        <ErrorLabel
          message={errorMessage}
          onRetry={onRetrySaveOrder}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ cart, order }) => ({
  products: cart.products,
  errorMessage: order.errorMessage
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onSaveOrder: saveOrder,
  onRetrySaveOrder: retrySaveOrder
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);