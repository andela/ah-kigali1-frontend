import React from "react";
import { shallow } from "enzyme";
import { Home, mapStateToProps } from "../../views/Home";

const props = {
  fetchAllArticles: jest.fn(),
  allArticles: [{ title: "the fish climbed the tree" }]
};

const allArticles = [
  {
    title: "the fish climbed the tree",
    body: "fdkhrsgdjfkheiusdhfkjgdhfbjkhbjk"
  }
];

const wrapper = shallow(<Home {...props} />);
describe("Home component", () => {
  test("matches the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("testing component will receive props", () => {
    wrapper.setProps({ allArticles });
    expect(wrapper.state().allArticles).toEqual(allArticles);
    wrapper.setProps({ allArticles });
    expect(wrapper.state().allArticles).toEqual(allArticles);
  });

  test("map state to props", () => {
    mapStateToProps({ allArticles });
  });
});
