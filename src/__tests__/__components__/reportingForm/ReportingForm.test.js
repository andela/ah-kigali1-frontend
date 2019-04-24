import React from "react";
import { shallow } from "enzyme";
import { MoreReactions } from "../../../components/reportingForm/MoreReactionsModal";

describe("reporting article components", () => {
  test("should display more reactions component", () => {
    const props = {
      displayReportArticleForm: jest.fn()
    };
    const wrapper = shallow(<MoreReactions {...props} />);
    expect(wrapper.find(".popup__report")).toHaveLength(1);
  });
});
