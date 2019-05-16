import React from "react";
import { shallow } from "enzyme";
import { props1 } from "../__mocks__/testData";
import { Article } from "../../views/ReadArticle";
import HighlighPopover from "../../components/PopOvers/HighlighPopover";

const component = shallow(<Article {...props1} />);
describe("Text highligh and comment", () => {
  let instance;
  beforeEach(() => {
    instance = component.instance();
    window.getSelection = jest.fn().mockReturnValue({
      getRangeAt: () => ({
        getBoundingClientRect: () => ({
          top: 244,
          left: 178
        })
      })
    });

    instance.setArticleBodyRef({ contains: jest.fn() });
    jest.spyOn(instance, "markHighlightText");
  });

  test("should render highlight popover", () => {
    expect(component.find(HighlighPopover).length).toEqual(1);
  });

  test("should trigger highlight handler on mouse move", () => {
    const { top, left, highlightedText } = component.state();
    instance.articleBodyRef.contains.mockReturnValue(true);
    const articleBody = component.find(`[test-data="article-body"]`);
    articleBody.simulate("mouseup", { target: "hello world" });
    expect(window.getSelection).toBeCalled();
    expect(component.state().top).not.toBe(top);
    expect(component.state().left).not.toBe(left);
    expect(component.state().highlightedText).not.toBe(highlightedText);
  });
  test("should mark highlight in another color", () => {
    const popover = component.find(`[data-test="selection-popover"]`).at(0);
    popover.prop("onClick")();
    expect(instance.markHighlightText).toBeCalledWith(false, "withComment");
    popover.prop("onHighlight")();
    expect(instance.markHighlightText).toBeCalledWith(true);
  });
});
