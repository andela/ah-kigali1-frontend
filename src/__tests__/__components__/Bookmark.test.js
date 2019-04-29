import "@babel/polyfill";
import React from "react";
import { shallow } from "enzyme";
import Bookmark from "../../components/common/Bookmarks";

describe("test bookmark component", () => {
  const setUp = props => shallow(<Bookmark {...props} />);
  const props = {
    icon: "test",
    onClick: jest.fn()
  };

  test("should render the component", () => {
    const bookmarkComponent = setUp(props);
    const imgElement = bookmarkComponent.find("img");
    expect(imgElement.length).toBe(1);
    expect(imgElement.hasClass("share-icon")).toBe(true);
  });
});
