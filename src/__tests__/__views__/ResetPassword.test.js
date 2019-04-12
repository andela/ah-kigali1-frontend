import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import { ResetPassword } from "../../views/ResetPassword";
import TextInput from "../../components/common/Inputs/TextInput";
import FormButton from "../../components/common/Buttons/FormButton";

const [handleInputChange, sendResetLink] = new Array(2).fill(jest.fn());
const userInput = { email: "me@example.com" };
const setUp = () => {
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
  return { props, wrapper };
};
describe("Login component", () => {
  let component;
  beforeEach(() => {
    sinon.spy(ResetPassword.prototype, "handleOnChange");
    sinon.spy(ResetPassword.prototype, "handleSubmit");
    const { wrapper } = setUp();
    component = wrapper;
  });
  afterEach(() => {
    ResetPassword.prototype.handleOnChange.restore();
    ResetPassword.prototype.handleSubmit.restore();
  });
  describe("component render", () => {
    it("should render two TextInputs and button", () => {
      expect(component.find(TextInput).length).toBe(1);
      expect(component.find(FormButton).length).toBe(1);
    });
    it("should render component with initial props", () => {
      component.find(TextInput).forEach(input => {
        expect(input.props().value).toBe(userInput.email);
      });
    });
    it("should call handleOnChange when user enter input", () => {
      component
        .find(TextInput)
        .at(0)
        .simulate("change", {
          target: {
            name: "email",
            value: "example@yahoo.com"
          }
        });

      expect(ResetPassword.prototype.handleOnChange.calledOnce).toBe(true);
      expect(handleInputChange).toBeCalledWith("email", "example@yahoo.com");
    });

    it("returns validation errors", () => {
      component
        .find(FormButton)
        .at(0)
        .simulate("click");
      expect(ResetPassword.prototype.handleSubmit.calledOnce).toBe(true);
      expect(sendResetLink).toBeCalledWith({ ...userInput });
    });
  });
});
