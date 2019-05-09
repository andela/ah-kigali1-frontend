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
  mockIsMatch,
  callback
] = new Array(5).fill(jest.fn());
const token = "1234567qwertyu";
const props = {
  isSubmitting: false,
  password: "password",
  confirmPassword: "password",
  passwordUpdateSuccess: false,
  handleInputChange,
  handleUpdatePassword,
  errors: {},
  location: { search: `?token=${token}` },
  history: { push: callback }
};
const wrapper = shallow(<UpdatePassword {...props} />);
const findElement = (element, index) => wrapper.find(element).at(index);
const dataFromForm = {
  password: { name: "password", value: "password" },
  confirmPassword: { name: "confirmPassword", value: "password" }
};
describe("Update Password", () => {
  describe("test snapshot", () => {
    it("should match the snapshot", () => {
      expect(toJson(UpdatePassword)).toMatchSnapshot();
      expect(wrapper.find(TextInput).length).toEqual(2);
      expect(wrapper.find(FormButton).length).toEqual(1);
    });
  });
  describe("test component life cycle", () => {
    it("should update state once props updated", () => {
      const errorPayload = {
        message: "Password too short"
      };
      wrapper.setProps({
        errors: {
          ...errorPayload
        }
      });
      expect(wrapper.state().token).toEqual(token);
      expect(wrapper.state().errors).toEqual({
        ...errorPayload
      });
    });
  });
  describe("component method", () => {
    let instance;
    beforeEach(() => {
      instance = wrapper.instance();
      jest.spyOn(instance, "handleOnChange");
      jest.spyOn(instance, "handleSubmit");
      jest.spyOn(instance, "handleNavigation");
    });
    afterEach(() => {
      instance.handleOnChange.mockClear();
      instance.handleSubmit.mockClear();
      handleInputChange.mockClear();
      handleUpdatePassword.mockClear();
      mockFormData.mockClear();
      mockIsMatch.mockClear();
      callback.mockClear();
      wrapper.setProps({
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
      wrapper.setProps({
        passwordUpdateSuccess: true
      });
      expect(instance.handleSubmit.mock.calls.length).toBe(1);
      expect(handleUpdatePassword).not.toBeCalledWith({
        token: wrapper.state().token,
        password: dataFromForm.password.value
      });
      expect(instance.handleNavigation).toBeCalledWith("sign_in");
    });
    it("should return validation errors", () => {
      mockFormData.mockReturnValue({});
      mockIsMatch.mockReturnValue({});
      Validator.formData = mockFormData.bind(Validator);
      Validator.isMatch = mockIsMatch.bind(Validator);
      findElement(FormButton, 0).simulate("click");
      expect(instance.handleSubmit.mock.calls.length).toBe(1);
      expect(handleUpdatePassword).toBeCalledWith({
        token: wrapper.state().token,
        password: dataFromForm.password.value
      });
    });
  });
});
