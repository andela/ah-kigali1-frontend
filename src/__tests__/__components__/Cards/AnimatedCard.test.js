import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import { AnimatedCard } from "../../../components/common/Cards/AnimatedCard";
import { articles } from "../../__mocks__/testData";

const props = {
  ...articles[0],
  likes: articles[0].likes.length
};
const wrapper = shallow(<AnimatedCard {...props} />);
describe("Animated Card Component", () => {
  test("should match the snapshot", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
