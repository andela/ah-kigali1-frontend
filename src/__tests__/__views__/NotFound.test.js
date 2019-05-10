import React from "react";
import { shallow } from "enzyme";
import NotFound from "../../views/NotFound";

describe("not found ", () => {
  test("should render not found", () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find("h1").text()).toEqual(
      "Ahhhhh!!!!!!! this page does not exist ."
    );
    expect(wrapper.find("h2").text()).toEqual(
      "The page you‘re trying to reach does not exist :(. Check the address."
    );
  });
});
