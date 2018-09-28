import React from "react";
import Modals from "./modals";

describe("Modals container", () => {

  it("Modals container", () => {
    const component = shallow(<Modals/>);
    matchSnapshot(component);
  });
});