import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { UpdatePassword } from "../../views/UpdatePassword";
import Validator from "../../utils/validator";
import TextInput from "../../components/common/Inputs/TextInput";
import FormButton from "../../components/common/Buttons/FormButton";

const [
  handleInputChange,
  handleUpdatePassword,
  mockFormData,
  mockIsMatch
] = new Array(4).fill(jest.fn());
const token = "1234567qwertyu";
const props = {
  isSubmitting: false,
  password: "password",
  confirmPassword: "password",
  handleInputChange,
  handleUpdatePassword,
  errors: {},
  location: { search: `?token=${token}` }
};
const warper = shallow(<UpdatePassword {...props} />);
const findElement = (element, index) => warper.find(element).at(index);
const dataFromForm = {
  password: { name: "password", value: "password" },
  confirmPassword: { name: "confirmPassword", value: "password" }
};
describe("Update Password", () => {
  describe("test snapshot", () => {
    it("should match the snapshot", () => {
      expect(toJson(UpdatePassword)).toMatchSnapshot();
      expect(warper.find(TextInput).length).toEqual(2);
      expect(warper.find(FormButton).length).toEqual(1);
    });
  });
  describe("test component life cycle", () => {
    it("should update state once props updated", () => {
      const errorPayload = {
        message: "Password too short"
      };
      warper.setProps({
        errors: {
          ...errorPayload
        }
      });
      expect(warper.state().token).toEqual(token);
      expect(warper.state().errors).toEqual({
        ...errorPayload
      });
    });
  });
  describe("component method", () => {
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
      handleUpdatePassword.mockClear();
      mockFormData.mockClear();
      mockIsMatch.mockClear();
      warper.setProps({
        ...props
      });
    });
    it("responds to user input on password field", () => {
      findElement(TextInput, 0).simulate("change", {
        target: {
          ...dataFromForm.password
        }
      });
      expect(instance.handleOnChange.mock.calls.length).toBe(1);
      expect(handleInputChange).toBeCalledWith(
        dataFromForm.password.name,
        dataFromForm.password.value
      );
    });
    it("responds to user input for  confirmPassword field", () => {
      findElement(TextInput, 1).simulate("change", {
        target: {
          ...dataFromForm.confirmPassword
        }
      });
      expect(instance.handleOnChange.mock.calls.length).toBe(1);
      expect(handleInputChange).toBeCalledWith(
        dataFromForm.confirmPassword.name,
        dataFromForm.confirmPassword.value
      );
    });
    it("should return validation errors", () => {
      mockFormData.mockReturnValue({});
      mockIsMatch.mockReturnValue({ message: "Password miss match" });
      Validator.formData = mockFormData.bind(Validator);
      Validator.isMatch = mockIsMatch.bind(Validator);
      findElement(FormButton, 0).simulate("click");
      expect(instance.handleSubmit.mock.calls.length).toBe(1);
      expect(handleUpdatePassword).not.toBeCalledWith({
        token: warper.state().token,
        password: dataFromForm.password.value
      });
    });
    it("should return validation errors", () => {
      mockFormData.mockReturnValue({});
      mockIsMatch.mockReturnValue({});
      Validator.formData = mockFormData.bind(Validator);
      Validator.isMatch = mockIsMatch.bind(Validator);
      findElement(FormButton, 0).simulate("click");
      expect(instance.handleSubmit.mock.calls.length).toBe(1);
      expect(handleUpdatePassword).toBeCalledWith({
        token: warper.state().token,
        password: dataFromForm.password.value
      });
    });
  });
});
