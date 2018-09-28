import React from "react";
import ReactDOM from "react-dom";
import App from "./app";

describe("App container", () => {

  it("App renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("App container", () => {
    const component = shallow(<App/>);
    matchSnapshot(component);
  });
});