import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import { SocialAuth } from "../../views/SocialAuth";

const [handleUserLogin] = new Array(2).fill(jest.fn());
const props = {
  location: { search: "?token=23qwertyuhjbgty" },
  handleUserLogin,
  isSubmitting: true,
  socialAuthSuccess: false,
  socialAuthFailed: false
};
const wrapper = shallow(<SocialAuth {...props} />);

describe("Social auth component", () => {
  let instance;
  beforeEach(() => {
    instance = wrapper.instance();
    jest.spyOn(instance, "handleFailure");
    jest.spyOn(instance, "handleSuccess");
  });
  afterEach(() => {
    handleUserLogin.mockClear();
    instance.handleFailure.mockClear();
    instance.handleSuccess.mockClear();
    wrapper.setProps({
      ...props
    });
  });
  it("should match the snapshot", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(handleUserLogin).toHaveBeenCalledWith("23qwertyuhjbgty");
  });
  it("return failure and redirect to sign_in page", () => {
    wrapper.setProps({
      isSubmitting: false,
      socialAuthFailed: true
    });
    expect(instance.handleSuccess.mock.calls.length).toBe(0);
    expect(instance.handleFailure.mock.calls.length).toBe(1);
  });
  it("return failure and redirect to sign_in page", () => {
    wrapper.setProps({
      isSubmitting: false,
      socialAuthSuccess: true
    });
    expect(instance.handleSuccess.mock.calls.length).toBe(1);
    expect(instance.handleFailure.mock.calls.length).toBe(0);
  });
});
