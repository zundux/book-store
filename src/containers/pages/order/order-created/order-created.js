import React from "react";
import { connect } from "react-redux";
import { SUPPORT_EMAIL_ADDRESS } from "../../../../api";

export const OrderCreated = ({ orderId }) => (
  <div>
    {orderId && (
      <p>Order № <b>{orderId}</b> was created successfully</p>
    )}
    {!orderId && (
      <p>
        Something went wong.
        <br/>
        Please, contact us
        &nbsp;
        <a href={`mailto:${SUPPORT_EMAIL_ADDRESS}`}>
          {SUPPORT_EMAIL_ADDRESS}
        </a>
      </p>
    )}
  </div>
);

const mapStateToProps = ({ order }) => ({
  orderId: order.id
});

export default connect(
  mapStateToProps,
  null
)(OrderCreated);