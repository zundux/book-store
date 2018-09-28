import React from "react";
import { Field as ReduxFormField, formValueSelector, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as R from "ramda";
import { focusOnFirstInvalidField } from "../../../../helpers/index";

export const CustomField = ({ input, label, type, input: { name }, meta: { touched, error, warning } }) => (
  <div>
    <input {...input} placeholder={label} type={type}/>
    {touched && (
      (error && <span>{error}</span>) ||
      (warning && <span>{warning}</span>)
    )}
    {type === "checkbox" && (
      <label htmlFor={name}>{label}</label>
    )}
  </div>
);

export const Field = ({ name, label, type }) => (
  <ReduxFormField
    {...{ name, label, type }}
    component={CustomField}
  />
);

export const OrderDetailsForm = ({ useShippingInfoAsPaymentInfo, pristine, submitting, handleSubmit }) => (
  <form onSubmit={handleSubmit}>

    <fieldset>
      <legend>
        <h2>Contact information</h2>
      </legend>

      <Field name="contact.firstName" label="First name" type="text"/>
      <Field name="contact.lastName" label="Last name" type="text"/>
      <Field name="contact.phone" label="Phone" type="text"/>
      <Field name="contact.email" label="Email" type="text"/>
    </fieldset>

    <fieldset>
      <legend>
        <h2>Shipping address</h2>
      </legend>

      <Field name="shipping.address" label="Address 1" type="text"/>
      <Field name="shipping.addressOptional"
             label="Address 2 (Optional) Apartment, suite, floor, etc."
             type="text"/>
      <Field name="shipping.city" label="City" type="text"/>
      <Field name="shipping.country" label="Country" type="text"/>
      <Field name="shipping.region" label="State/Province/Region" type="text"/>
      <Field name="shipping.postCode" label="Zip/Postal Code" type="text"/>

    </fieldset>

    <Field name="useShippingInfoAsPaymentInfo"
           label="Use Shipping address as Payment address"
           type="checkbox"
    />

    {!useShippingInfoAsPaymentInfo && (
      <fieldset>
        <legend>
          <h2>Payment address</h2>
        </legend>

        <Field name="payment.address" label="Address 1" type="text"/>
        <Field name="payment.addressOptional"
               label="Address 2 (Optional) Apartment, suite, floor, etc."

               type="text"/>
        <Field name="payment.city" label="City" type="text"/>
        <Field name="payment.country" label="Country" type="text"/>
        <Field name="payment.region" label="State/Province/Region" type="text"/>
        <Field name="payment.postCode" label="Zip/Postal Code" type="text"/>
      </fieldset>
    )}

    <button type="submit" disabled={submitting}>
      Get quote
    </button>
  </form>
);

const formName = "order-details";
const selector = formValueSelector(formName);
const mapStateToProps = state => ({
  useShippingInfoAsPaymentInfo: selector(state, "useShippingInfoAsPaymentInfo")
});

export default R.pipe(
  reduxForm({
    form: formName,
    onSubmitFail: focusOnFirstInvalidField
  }),
  connect(mapStateToProps)
)(OrderDetailsForm);