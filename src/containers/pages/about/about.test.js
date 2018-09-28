import React from "react";
import About from "./about";

describe("About page", () => {

  it("About page", () => {
    const component = shallow(<About/>);
    matchSnapshot(component);
    // todo check page header
    // todo check page title
  });
});