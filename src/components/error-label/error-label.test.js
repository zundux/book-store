import React from "react";
import ErrorLabel from "./error-label";

describe("Error label", () => {

  test("Error label has only the message", () => {
    const message = "Something went wrong";

    const component = shallow(
      <ErrorLabel {...{
        message
      }}/>
    );
    matchSnapshot(component);
  });

  test("Error label has the message and button with text \"Retry\"", () => {
    const message = "Something went wrong";
    const onRetry = jest.fn();

    const component = shallow(
      <ErrorLabel {...{
        message,
        onRetry
      }}/>
    );
    matchSnapshot(component);
    // call func onRetry if click on Retry button
    component.find(".retry").simulate("click");
    expect(onRetry).toHaveBeenCalled();
  });
});

