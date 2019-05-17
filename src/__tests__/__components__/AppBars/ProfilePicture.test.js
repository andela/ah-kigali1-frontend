import React from "react";
import { shallow } from "enzyme";

import ProfilePicture from "../../../components/common/AppBars/ProfilePicture";

const props = {
  profile: { username: "Yves2019" },
  onClick: jest.fn()
};

const props1 = {
  profile: {
    ...props.profile,
    firstName: "Yves",
    lastName: "Iraguha"
  },
  image: "fakeImageAddress"
};
describe("Profile picture in navigation bar", () => {
  test("should render the profile picture without firstName, and lastName", () => {
    const wrapper = shallow(<ProfilePicture {...props} />);
    expect(
      wrapper
        .find("p")
        .at(0)
        .text()
    ).toEqual("Yves2019");
  });

  test("should render the profile picture with username", () => {
    const wrapper = shallow(<ProfilePicture {...props1} />);
    expect(
      wrapper
        .find("p")
        .at(0)
        .text()
    ).toEqual("Yves Iraguha");
  });

  test("should respond to onClick event", () => {
    const wrapper = shallow(<ProfilePicture {...props} />);
    wrapper
      .find("button")
      .at(0)
      .simulate("click");
    expect(props.onClick).toHaveBeenCalled();
  });
});
