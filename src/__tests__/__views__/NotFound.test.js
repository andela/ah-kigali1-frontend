import React from "react";
import { shallow } from "enzyme";
import NotFound from "../../views/NotFound";

describe("not found ", () => {
  test("should render not found", () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find(".not-found").text()).toEqual(
      "404 The page does not exist"
    );
  });
});
