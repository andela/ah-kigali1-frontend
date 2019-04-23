import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import { Login, mapStateToProps } from "../../views/Login";
import { INITIAL_STATE } from "../../redux/reducers/loginReducers";
import Validator from "../../utils/validator";
import TextInput from "../../components/common/Inputs/TextInput";
import FormButton from "../../components/common/Buttons/FormButton";
import BasicButton from "../../components/common/Buttons/BasicButton";
import SocialButton from "../../components/common/Buttons/SocialButton";

const [handleTextInput, handleSignIn, mockedFormData] = new Array(3).fill(
  jest.fn()
);
jest.mock("../../utils/validator");

const props = {
  isSubmitting: false,
  email: "",
  password: "",
  errors: {},
  loginSuccess: false,
  token: null,
  handleSignIn,
  handleTextInput
};
const warper = shallow(<Login {...props} />);

const findElement = (element, index) => warper.find(element).at(index);

describe("Login component", () => {
  describe("component snapshot", () => {
    it("should match the right snapshot", () => {
      expect(toJson(warper)).toMatchSnapshot();
    });
  });

  describe("component instance", () => {
    let instance;
    const formData = {
      email: {
        name: "email",
        value: "luc.bayo@gmail.com"
      },
      password: {
        name: "password",
        value: "password"
      }
    };
    beforeEach(() => {
      instance = warper.instance();
      jest.spyOn(instance, "handleOnChange");
      jest.spyOn(instance, "handleSubmit");
      jest.spyOn(instance, "handleNavigation");
    });
    afterEach(() => {
      instance.handleOnChange.mockClear();
      instance.handleSubmit.mockClear();
      instance.handleNavigation.mockClear();
      mockedFormData.mockClear();
      handleSignIn.mockClear();
      handleTextInput.mockClear();
      warper.setProps({
        ...props
      });
    });
    it("handles input change for email field", () => {
      findElement(TextInput, 0).simulate("change", {
        target: formData.email
      });
      expect(instance.handleOnChange.mock.calls.length).toBe(1);
      expect(instance.handleOnChange).toHaveBeenCalledWith({
        target: formData.email
      });
      expect(handleTextInput).toHaveBeenCalledWith(
        formData.email.name,
        formData.email.value
      );
    });
    it("handles input change for email field", () => {
      findElement(TextInput, 1).simulate("change", {
        target: formData.password
      });
      expect(instance.handleOnChange.mock.calls.length).toBe(1);
      expect(instance.handleOnChange).toHaveBeenCalledWith({
        target: formData.password
      });
    });
    it("should signIn user if email and password are provided", () => {
      mockedFormData.mockReturnValue({});
      Validator.formData = mockedFormData.bind(Validator);
      warper.setProps({
        password: formData.password.value,
        email: formData.email.value
      });
      findElement(FormButton, 0).simulate("click");
      expect(instance.handleSubmit.mock.calls.length).toBe(1);
      warper.setProps({
        loginSuccess: true
      });
      expect(instance.handleNavigation).toBeCalledWith("");
      expect(handleSignIn).toHaveBeenCalledWith({
        email: formData.email.value,
        password: formData.password.value
      });
    });
    it("should not signIn user if email and password are not provided", () => {
      const errors = { email: "Email is required" };
      mockedFormData.mockReturnValue({ ...errors });
      Validator.formData = mockedFormData.bind(Validator);
      warper.setProps({
        email: "",
        password: "password"
      });
      findElement(FormButton, 0).simulate("click");
      expect(instance.handleSubmit.mock.calls.length).toBe(1);
      expect(handleSignIn).not.toHaveBeenCalledWith({
        email: props.email,
        password: props.password
      });
      expect(warper.state().errors).toEqual({
        ...errors
      });
      expect(instance.handleNavigation).not.toBeCalled();
    });
  });
  describe("rendered component", () => {
    let instance;
    beforeEach(() => {
      instance = warper.instance();
      jest.spyOn(instance, "handleNavigation");
    });
    afterEach(() => [
      warper.setProps({
        ...props
      })
    ]);
    it("should render without an error", () => {
      expect(warper.find(`[data-test="login"]`).length).toBe(1);
    });
    it("should render two part of the screen", () => {
      expect(warper.find(`[data-test="auth-left"]`).length).toBe(1);
      expect(warper.find(`[data-test="auth-right"]`).length).toBe(1);
    });
    it("should render all basic components", () => {
      expect(warper.find(`[data-test="logo"]`).length).toBe(2);
      expect(warper.find(`[data-test="login-form"]`).length).toBe(1);
      expect(warper.find(`[data-test="nav-link"]`).length).toBe(2);
      expect(warper.find(SocialButton).length).toBe(3);
    });
    it("should render two TextInputs and button", () => {
      expect(warper.find(TextInput).length).toBe(2);
      expect(warper.find(FormButton).length).toBe(1);
    });
    it("should navigate to sign up page", () => {
      findElement(BasicButton, 0).simulate("click");
      expect(instance.handleNavigation.mock.calls.length).toBe(1);
    });
    it("should render component with initial props", () => {
      warper.find(TextInput).forEach(input => {
        expect(input.props().value).toBe("");
      });
    });
    it("returns all mapped props from redux", () => {
      expect(mapStateToProps({ login: { ...INITIAL_STATE } })).toEqual({
        ...INITIAL_STATE
      });
    });
  });
});
