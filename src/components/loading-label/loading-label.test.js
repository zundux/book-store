import React from "react";
import LoadingLabel from "./loading-label";

describe("Loading label", () => {

  test("Loading label has only the message \"Loading, please wait\" ", () => {
    const component = shallow(
      <LoadingLabel/>
    );
    matchSnapshot(component);
  });
});

