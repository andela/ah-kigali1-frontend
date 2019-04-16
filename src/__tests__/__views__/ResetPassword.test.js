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
const warper = shallow(<ResetPassword {...props} />);
const findElement = (element, index) => warper.find(element).at(index);

describe("Login component", () => {
  describe("component render", () => {
    it("should match the snapshot", () => {
      expect(toJson(warper)).toMatchSnapshot();
    });
    it("should render two TextInputs and button", () => {
      expect(warper.find(TextInput).length).toBe(1);
      expect(warper.find(FormButton).length).toBe(1);
    });
    it("should render component with initial props", () => {
      warper.find(TextInput).forEach(input => {
        expect(input.props().value).toBe(userInput.email);
      });
    });
  });
  describe("component properites", () => {
    let instance;
    beforeEach(() => {
      instance = warper.instance();
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
      warper.setProps({
        email: ""
      });
      findElement(FormButton, 0).simulate("click");
      expect(instance.handleSubmit.mock.calls.length).toBe(1);
      expect(sendResetLink.mock.calls.length).toBe(0);
      expect(sendResetLink).not.toBeCalledWith({ email: warper.props().email });
    });
  });
});
