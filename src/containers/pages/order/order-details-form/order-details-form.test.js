import React from "react";
import { CustomField, Field, OrderDetailsForm } from "./order-details-form";

describe("Order details form", () => {

  it("Order details form should not show payment info by default", () => {
    const useShippingInfoAsPaymentInfo = true;
    const pristine = true;
    const submitting = false;
    const handleSubmit = () => {
    };

    const component = shallow(
      <OrderDetailsForm {...{
        useShippingInfoAsPaymentInfo,
        pristine,
        submitting,
        handleSubmit
      }}/>
    );
    matchSnapshot(component);
    // todo checkbox "use shipping address as payment address" should be checked
  });

  it("Order details form should show payment info if  \"use shipping address as payment address\" checkbox is not checked", () => {
    const useShippingInfoAsPaymentInfo = false;
    const pristine = true;
    const submitting = false;
    const handleSubmit = () => {
    };

    const component = shallow(
      <OrderDetailsForm {...{
        useShippingInfoAsPaymentInfo,
        pristine,
        submitting,
        handleSubmit
      }}/>
    );
    matchSnapshot(component);
    // todo checkbox "use shipping address as payment address" should not be checked
  });


  it("Form field", () => {
    const fieldParams = {
      name: "field-name",
      label: "field label",
      type: "text"
    };

    const component = shallow(<Field {...fieldParams}/>);
    matchSnapshot(component);
  });


  it("Custom text field", () => {
    const fieldParams = {
      label: null,
      type: "text",
      input: {
        name: "field-name",
        onChange: () => {
        }
      },
      meta: { touched: false, error: false, warning: false }
    };

    const component = shallow(<CustomField {...fieldParams}/>);
    matchSnapshot(component);
  });

  it("Custom checkbox field with label", () => {
    const fieldParams = {
      label: "checkbox field label",
      type: "checkbox",
      input: {
        name: "field-name",
        onChange: () => {
        }
      },
      meta: { touched: false, error: false, warning: false }
    };

    const component = shallow(<CustomField {...fieldParams}/>);
    matchSnapshot(component);
  });

  it("Custom text field with an error", () => {
    const fieldParams = {
      label: null,
      type: "text",
      input: {
        name: "field-name",
        onChange: () => {
        }
      },
      meta: { touched: true, error: "some error", warning: false }
    };

    const component = shallow(<CustomField {...fieldParams}/>);
    matchSnapshot(component);
  });

  it("Custom text field with a warning", () => {
    const fieldParams = {
      label: null,
      type: "text",
      input: {
        name: "field-name",
        onChange: () => {
        }
      },
      meta: { touched: true, error: false, warning: "some warning" }
    };

    const component = shallow(<CustomField {...fieldParams}/>);
    matchSnapshot(component);
  });
});