/* eslint-disable no-underscore-dangle */
import React from "react";
import "@babel/polyfill";
import { Redirect } from "react-router-dom";
import { shallow } from "enzyme";
import Button from "../../components/common/Buttons/BasicButton";
import { ReportingForm as ReportArticle } from "../../components/reportingForm/ReportingForm";

const shallowSetup = () => {
  const props = {
    cancelReport: jest.fn(),
    slug: "hello-world",
    reportArticle: jest.fn()
  };
  const wrapper = shallow(<ReportArticle {...props} />);

  return {
    wrapper,
    props
  };
};

let wrapper, props;

describe("Report article component", () => {
  beforeEach(() => {
    localStorage.__STORE__.setItem("token", "helloWorld");
    jest.useFakeTimers();
    jest.runAllTimers();
    ({ wrapper, props } = shallowSetup());
  });

  test("should render the component for creating a report", () => {
    expect(wrapper.find(`[data-test="button"]`)).toHaveLength(2);
  });

  test("should respond on input change", () => {
    wrapper
      .find(`[data-test="comment-model-input"]`)
      .at(0)
      .simulate("change", {
        target: {
          value: "hello"
        }
      });
    expect(wrapper.state().reportDescription).toEqual("hello");
  });

  test("should submit a report", async () => {
    wrapper
      .find(`[data-test="comment-model-input"]`)
      .at(0)
      .simulate("change", {
        target: {
          value: "hello world, this is a report"
        }
      });
    await props.reportArticle.mockResolvedValue({
      status: 200,
      message: "Article reported"
    });
    wrapper
      .find(".report")
      .at(1)
      .simulate("click");
    expect(props.reportArticle).toHaveBeenCalled();
  });

  test("should handle report error", async () => {
    wrapper
      .find(`[data-test="comment-model-input"]`)
      .at(0)
      .simulate("change", {
        target: {
          value: "hello world, this is a report"
        }
      });
    await props.reportArticle.mockResolvedValue({
      status: 409,
      message: "Article already reported"
    });
    wrapper
      .find(".report")
      .at(1)
      .simulate("click");
    expect(props.reportArticle).toHaveBeenCalled();
  });

  test("should try to submit a report without description", () => {
    wrapper
      .find(".report")
      .at(1)
      .simulate("click");
    expect(wrapper.state().reportError).toEqual(
      "Report should be more than 10 and less 255 characters long"
    );
  });
  test("should cancel report form", () => {
    wrapper
      .find(".report")
      .at(0)
      .simulate("click");
    expect(props.cancelReport).toHaveBeenCalled();
  });
});

describe("Reporting when not logged in", () => {
  beforeEach(() => {
    localStorage.__STORE__.clear();
  });

  test("should redirect to sign in", () => {
    ({ wrapper, props } = shallowSetup());
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
});
