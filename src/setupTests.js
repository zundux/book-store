import Enzyme, { mount, render, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import jestFetchMock from "./tests/jest-fetch-mock";

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;

global.fetch = jestFetchMock;

global.matchSnapshot = component => {
  // or expect(toJson(component, {
  //   noKey: false,
  //   mode: 'deep' // 'shallow' - default
  // })).toMatchSnapshot();
  expect(component).toMatchSnapshot();
};