import React from "react";
import { shallow } from "enzyme";
import { ReportingForm } from "../../../components/reportingForm/ReportingForm";
import { MoreReactions } from "../../../components/reportingForm/MoreReactionsModal";

describe("reporting article components", () => {
  test("should display more reactions component", () => {
    const props = {
      displayReportArticleForm: jest.fn()
    };
    const wrapper = shallow(<MoreReactions {...props} />);
    expect(wrapper.find(".popup__report")).toHaveLength(1);
  });

  test("should display the reporting form ", () => {
    const props = {
      onInputChange: jest.fn(),
      submitReport: jest.fn(),
      cancelReport: jest.fn(),
      displayReportArticleForm: jest.fn()
    };
    const wrapper = shallow(<ReportingForm {...props} />);
    expect(wrapper.find(".reporting__form__container")).toHaveLength(1);
  });
});
