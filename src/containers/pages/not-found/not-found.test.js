import React from "react";
import NotFound from "./not-found";

describe("Not found page", () => {

  it("not found page", () => {
    const component = shallow(<NotFound/>);
    matchSnapshot(component);
    // todo check page header
    // todo check page title
  });
});