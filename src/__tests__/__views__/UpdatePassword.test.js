import React from "react";
import sinon from "sinon";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { UpdatePassword } from "../../views/UpdatePassword";
import Validator from "../../utils/validator";
import TextInput from "../../components/common/Inputs/TextInput";
import FormButton from "../../components/common/Buttons/FormButton";

const [handleInputChange, handleUpdatePassword] = new Array(2).fill(jest.fn());

const setUp = newProps => {
  const props = {
    isSubmitting: false,
    password: "password",
    confirmPassword: "password",
    handleInputChange,
    handleUpdatePassword,
    errors: {},
    ...newProps
  };
  return shallow(<UpdatePassword {...props} />);
};
const findElement = (element, index, props = {}) =>
  setUp(props)
    .find(element)
    .at(index);

describe("Update Password", () => {
  describe("test snaptshot", () => {
    it("should match the snapshot", () => {
      const component = setUp();
      expect(toJson(UpdatePassword)).toMatchSnapshot();
      expect(component.find(TextInput).length).toEqual(2);
      expect(component.find(FormButton).length).toEqual(1);
    });
  });
  describe("test methods", () => {
    beforeEach(() => {
      sinon.spy(UpdatePassword.prototype, "handleOnChange");
      sinon.spy(UpdatePassword.prototype, "handleSubmit");
    });
    afterEach(() => {
      UpdatePassword.prototype.handleOnChange.restore();
      UpdatePassword.prototype.handleSubmit.restore();
      handleUpdatePassword.mockRestore();
      handleUpdatePassword.mockRestore();
    });
    describe("TextInput", () => {
      it("returns handleOnChangeText for password field", () => {
        findElement(TextInput, 0).simulate("change", {
          target: {
            name: "password",
            value: "password"
          }
        });
        expect(UpdatePassword.prototype.handleOnChange.calledOnce).toBe(true);
        expect(handleInputChange).toBeCalledWith("password", "password");
      });
      it("returns handleOnChangeText for confirm password", () => {
        findElement(TextInput, 0).simulate("change", {
          target: {
            name: "confirmPassword",
            value: "password"
          }
        });
        expect(UpdatePassword.prototype.handleOnChange.calledOnce).toBe(true);
        expect(handleInputChange).toBeCalledWith("confirmPassword", "password");
      });
      it("returns handleSubmit", () => {
        const mockValidation = jest.fn();
        const mockIsMatch = jest.fn();
        mockValidation.mockReturnValue({});
        Validator.formData = mockValidation.bind(Validator);
        Validator.isMatch = mockIsMatch.bind(Validator);
        findElement(FormButton, 0).simulate("click");
        expect(UpdatePassword.prototype.handleSubmit.calledOnce).toBe(true);
        expect(mockValidation).toBeCalledWith({
          password: "password",
          confirmPassword: "password"
        });
        expect(handleUpdatePassword).toBeCalledWith("password");
      });
      it("should not call handleUpdate", () => {
        const mockValidation = jest.fn();
        const mockIsMatch = jest.fn(() => {
          " Password miss match";
        });
        Validator.formData = mockValidation.bind(Validator);
        Validator.isMatch = mockIsMatch.bind(Validator);
        findElement(FormButton, 0, { password: "helloworld" }).simulate(
          "click"
        );
        expect(UpdatePassword.prototype.handleSubmit.calledOnce).toBe(true);
        expect(mockValidation).toBeCalledWith({
          password: "helloworld",
          confirmPassword: "password"
        });
        expect(handleUpdatePassword.mock.calls.length).toEqual(1);
      });
    });
  });
});
