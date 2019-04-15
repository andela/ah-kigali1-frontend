import React from "react";
import sinon from "sinon";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { UpdatePassword } from "../../views/UpdatePassword";
import Validator from "../../utils/validator";
import TextInput from "../../components/common/Inputs/TextInput";
import FormButton from "../../components/common/Buttons/FormButton";

const [handleInputChange, handleUpdatePassword] = new Array(2).fill(jest.fn());
let mockFormData = jest.fn();
let mockIsMatch = jest.fn();
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
  describe("test snapshot", () => {
    it("should match the snapshot", () => {
      const component = setUp();
      expect(toJson(UpdatePassword)).toMatchSnapshot();
      expect(component.find(TextInput).length).toEqual(2);
      expect(component.find(FormButton).length).toEqual(1);
    });
  });
  describe("test component life cycle", () => {
    it("should update state once props updated", () => {
      const errorPayload = {
        message: "Password too short"
      };
      const component = setUp();
      component.setProps({
        errors: {
          ...errorPayload
        }
      });
      expect(component.state().errors).toEqual({
        ...errorPayload
      });
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
      mockFormData.mockRestore();
      mockIsMatch.mockRestore();
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
        findElement(TextInput, 1).simulate("change", {
          target: {
            name: "confirmPassword",
            value: "password"
          }
        });
        expect(UpdatePassword.prototype.handleOnChange.calledOnce).toBe(true);
        expect(handleInputChange).toBeCalledWith("confirmPassword", "password");
      });
      it("should call handleUpdate if password match", () => {
        Validator.formData = mockFormData.bind(Validator);
        Validator.isMatch = mockIsMatch.bind(Validator);
        findElement(FormButton, 0).simulate("click");
        expect(UpdatePassword.prototype.handleSubmit.calledOnce).toBe(true);
        expect(mockFormData).toBeCalledWith({
          password: "password",
          confirmPassword: "password"
        });
        expect(handleUpdatePassword).toBeCalledWith("password");
      });
      it("should not call handleUpdate if password mismatch", () => {
        mockIsMatch = jest.fn(() => ({
          message: "hello world"
        }));
        Validator.formData = mockFormData.bind(Validator);
        Validator.isMatch = mockIsMatch.bind(Validator);
        findElement(FormButton, 0, { password: "helloworld" }).simulate(
          "click"
        );
        expect(UpdatePassword.prototype.handleSubmit.calledOnce).toBe(true);
        expect(handleUpdatePassword).not.toHaveBeenCalled();
      });
      it("should not call handleUpdate if password mismatch", () => {
        mockFormData = jest.fn(() => ({
          password: " Password is required"
        }));
        Validator.formData = mockFormData.bind(Validator);
        Validator.isMatch = mockIsMatch.bind(Validator);
        findElement(FormButton, 0, { password: "helloworld" }).simulate(
          "click"
        );
        expect(UpdatePassword.prototype.handleSubmit.calledOnce).toBe(true);
        expect(handleUpdatePassword).not.toHaveBeenCalled();
      });
    });
  });
});
