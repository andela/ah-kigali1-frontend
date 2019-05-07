import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { ResetPassword } from "../../views/ResetPassword";
import TextInput from "../../components/common/Inputs/TextInput";
import FormButton from "../../components/common/Buttons/FormButton";

const [handleInputChange, sendResetLink, mockedFormData] = new Array(3).fill(
  jest.fn()
);
const userInput = { email: "me@example.com" };

const props = {
  handleInputChange,
  email: userInput.email,
  sendResetLink,
  failedMessage: "",
  isSubmitting: false,
  isSuccess: false,
  successMessage: ""
};
const wrapper = shallow(<ResetPassword {...props} />);
const findElement = (element, index) => wrapper.find(element).at(index);

describe("Login component", () => {
  describe("component render", () => {
    it("should match the snapshot", () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    it("should render two TextInputs and button", () => {
      expect(wrapper.find(TextInput).length).toBe(1);
      expect(wrapper.find(FormButton).length).toBe(1);
    });
    it("should render component with initial props", () => {
      wrapper.find(TextInput).forEach(input => {
        expect(input.props().value).toBe(userInput.email);
      });
    });
  });
  describe("component properites", () => {
    let instance;
    beforeEach(() => {
      instance = wrapper.instance();
      jest.spyOn(instance, "handleOnChange");
      jest.spyOn(instance, "handleSubmit");
    });
    afterEach(() => {
      instance.handleOnChange.mockClear();
      instance.handleSubmit.mockClear();
      handleInputChange.mockClear();
      sendResetLink.mockClear();
      mockedFormData.mockClear();
    });
    it("should call handleOnChange when user enter input", () => {
      findElement(TextInput, 0).simulate("change", {
        target: {
          name: "email",
          value: "example@yahoo.com"
        }
      });
      expect(instance.handleOnChange.mock.calls.length).toBe(1);
      expect(handleInputChange).toBeCalledWith("email", "example@yahoo.com");
    });
    it("returns sendResetLink action creator", () => {
      findElement(FormButton, 0).simulate("click");
      expect(instance.handleSubmit.mock.calls.length).toBe(1);
      expect(sendResetLink).toBeCalledWith({ ...userInput });
    });
    it("returns validation errors", () => {
      wrapper.setProps({
        email: ""
      });
      findElement(FormButton, 0).simulate("click");
      expect(instance.handleSubmit.mock.calls.length).toBe(1);
      expect(sendResetLink.mock.calls.length).toBe(0);
      expect(sendResetLink).not.toBeCalledWith({ email: wrapper.props().email });
    });
  });
});
