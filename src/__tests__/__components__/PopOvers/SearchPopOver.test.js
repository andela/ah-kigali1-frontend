import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import { SearchPopOver } from "../../../components/PopOvers/SearchPopOver";
import { articles } from "../../__mocks__/testData";

const props = {
  ...articles[0],
  slug: articles[0].slug
};
describe("Search PopOver Component", () => {
  test("should match the snapshot", () => {
    expect(toJson(shallow(<SearchPopOver {...props} />))).toMatchSnapshot();
  });
});
