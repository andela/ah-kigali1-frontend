import React from "react";
import { shallow } from "enzyme";
import { Loading } from "../../../components/common/Spinner/Loading";
import imagePath from "../../../assets/img/circle-loading.gif";

describe("Loading", () => {
  test("renders without crashing", () => {
    const component = shallow(<Loading />);
    expect(component.find("img").prop("src")).toEqual(imagePath);
  });
});
