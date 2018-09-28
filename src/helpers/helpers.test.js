import { findFirstKey, flattenObj, focusOnFirstInvalidField, getFetchParams } from "./index";

describe("helper functions", () => {

  it("get flatten object from an object or an array", () => {
    const object = {
      a: 1,
      b: {
        bb: "text",
        bbb: {
          bbbb: [1, 2, 3, 4],
          bbbbb: [
            {
              id: 11
            },
            {
              id: 12,
              authors: ["author 1", "author 2"]
            }
          ]
        }
      }
    };
    const array = [object, 123];

    expect(flattenObj(object)).toMatchSnapshot();
    expect(flattenObj(array)).toMatchSnapshot();
  });

  it("get first by value", () => {
    const errors = {
      "first-name": undefined,
      "last-name": "required",
      "email": undefined,
      "phone": "not valid",
      "address": undefined
    };

    expect(findFirstKey(value => value !== undefined)(errors)).toMatchSnapshot();
  });

  it("call focus on form field (scroll window to field and set the field active)", () => {
    const firstInvalidFieldName = "last-name";
    const errors = {
      "first-name": undefined,
      [firstInvalidFieldName]: "required",
      "email": undefined,
      "phone": "not valid",
      "address": undefined
    };

    const focus = jest.fn();
    const getBoundingClientRect = jest.fn(() => {
      return { top: 300 };
    });
    const element = {
      focus,
      getBoundingClientRect
    };
    const scrollTo = jest.fn();
    const getElementsByName = jest.fn(() => [element]);
    document.getElementsByName = getElementsByName;
    window.scrollTo = scrollTo;
    window.pageYOffset = 150;

    focusOnFirstInvalidField(errors);

    expect(getElementsByName).toBeCalledWith(firstInvalidFieldName);
    expect(getBoundingClientRect).toHaveBeenCalled();
    expect(focus).toHaveBeenCalled();
    expect(scrollTo).toBeCalledWith(0, 350);
  });


  it("create a fetching parameters object", () => {
    const defaultParams = {
      q: "",
      filter: "full"
    };
    const params = { q: "man in black" };

    const expectedParams = {
      q: "man in black",
      filter: "full"
    };
    expect(getFetchParams(defaultParams, params)).toEqual(expectedParams);
  });
});