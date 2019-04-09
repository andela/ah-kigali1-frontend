import React from "react";
import { shallow } from "enzyme";
import Tag from "../../components/common/Tags/NewTag";

const shallowSetup = () => {
  const props = {
    title: "Reactjs",
    onClick: jest.fn()
  };

  const wrapper = shallow(<Tag {...props} />);
  return { wrapper, props };
};

describe("render tag component", () => {
  test("should contain span element ", () => {
    const { wrapper } = shallowSetup();
    expect(wrapper.find("span")).toHaveLength(1);
    expect(wrapper.find("span").text()).toEqual("Reactjs ");
    expect(wrapper.find("i")).toHaveLength(1);
  });
  test("should contain span element ", () => {
    const { wrapper, props } = shallowSetup();
    wrapper.find("i").simulate("click");
    expect(props.onClick).toHaveBeenCalled();
  });
});
