import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import { Login, mapStateToProps } from "../../views/Login";
import { INITIAL_STATE } from "../../redux/reducers/loginReducers";
import Validator from "../../utils/validator";
import TextInput from "../../components/common/Inputs/TextInput";
import FormButton from "../../components/common/Buttons/FormButton";
import BasicButton from "../../components/common/Buttons/BasicButton";
import SocialButton from "../../components/common/Buttons/SocialButton";

const [handleTextInput, handleSignIn] = new Array(2).fill(jest.fn());
jest.mock("../../utils/validator");

const setUp = () => {
  const props = {
    isSubmitting: false,
    email: "",
    password: "",
    errors: {},
    successMessage: null,
    token: null,
    handleSignIn,
    handleTextInput
  };
  const wrapper = shallow(<Login {...props} />);
  return { props, wrapper };
};

const findElement = (element, index) =>
  setUp()
    .wrapper.find(element)
    .at(index);

describe("Login component", () => {
  let component;
  beforeEach(() => {
    sinon.spy(Login.prototype, "handleOnChange");
    sinon.spy(Login.prototype, "handleSubmit");
    sinon.spy(Login.prototype, "handleNavigation");
    const { wrapper } = setUp();
    component = wrapper;
  });
  afterEach(() => {
    Login.prototype.handleOnChange.restore();
    Login.prototype.handleSubmit.restore();
    Login.prototype.handleNavigation.restore();
  });
  describe("component render", () => {
    it("should render without an error", () => {
      expect(component.find(`[data-test="login"]`).length).toBe(1);
    });
    it("should render two part of the screen", () => {
      expect(component.find(`[data-test="auth-left"]`).length).toBe(1);
      expect(component.find(`[data-test="auth-right"]`).length).toBe(1);
    });
    it("should render all basic components", () => {
      expect(component.find(`[data-test="logo"]`).length).toBe(2);
      expect(component.find(`[data-test="login-form"]`).length).toBe(1);
      expect(component.find(`[data-test="nav-link"]`).length).toBe(2);
      expect(component.find(SocialButton).length).toBe(3);
    });
    it("should render two TextInputs and button", () => {
      expect(component.find(TextInput).length).toBe(2);
      expect(component.find(FormButton).length).toBe(1);
    });
    it("should navigate to sign up page", () => {
      component
        .find(BasicButton)
        .at(0)
        .simulate("click");
      expect(Login.prototype.handleNavigation.calledOnce).toBe(true);
    });
    it("should render component with initial props", () => {
      component.find(TextInput).forEach(input => {
        expect(input.props().value).toBe("");
      });
    });
    it("should call handleOnChange when user enter input", () => {
      findElement(TextInput, 0).simulate("change", {
        target: {
          name: "email",
          value: "luc.bayo@gmail.com"
        }
      });

      expect(Login.prototype.handleOnChange.calledOnce).toBe(true);
      expect(handleTextInput).toBeCalledWith("email", "me@example.com");
    });
    it("should update password input value", () => {
      findElement(TextInput, 1).simulate("change", {
        target: {
          name: "password",
          value: "password"
        }
      });
      expect(Login.prototype.handleOnChange.calledOnce).toBe(true);
      expect(handleTextInput).toBeCalledWith("password", "password");
    });
    it("returns validation errors", () => {
      const staticFormData = jest.fn();
      staticFormData.mockReturnValue({
        email: "Email is required"
      });
      Validator.formData = staticFormData.bind(Validator);
      findElement(FormButton, 0).simulate("click");
      expect(Login.prototype.handleSubmit.calledOnce).toBe(true);
      expect(staticFormData).toBeCalledWith({ email: "", password: "" });
    });
    it("should call handleSubmit", () => {
      const staticFormData = jest.fn();
      staticFormData.mockReturnValue({});
      Validator.formData = staticFormData.bind(Validator);
      findElement(FormButton, 0).simulate("click");
      expect(Login.prototype.handleSubmit.calledOnce).toBe(true);
      expect(staticFormData).toBeCalledWith({
        email: "",
        password: ""
      });
    });
    it("returns all mapped props from redux", () => {
      expect(mapStateToProps({ login: { ...INITIAL_STATE } })).toEqual({
        ...INITIAL_STATE
      });
    });
  });
});
