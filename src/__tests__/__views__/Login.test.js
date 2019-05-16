/* eslint-disable no-underscore-dangle */
import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import { Login, mapStateToProps } from "../../views/Login";
import { INITIAL_STATE } from "../../redux/reducers/authReducers";
import Validator from "../../utils/validator";
import TextInput from "../../components/common/Inputs/TextInput";
import FormButton from "../../components/common/Buttons/FormButton";
import BasicButton from "../../components/common/Buttons/BasicButton";
import SocialButton from "../../components/common/Buttons/SocialButton";

const [handleTextInput, handleSignIn, mockedFormData, socialAuth] = new Array(
  4
).fill(jest.fn());
jest.mock("../../utils/validator");

const props = {
  isSubmitting: false,
  email: "",
  password: "",
  errors: {},
  loginSuccess: false,
  token: null,
  handleSignIn,
  handleTextInput,
  socialAuth,
  location: {},
  history: []
};
const wrapper = shallow(<Login {...props} />);

const findElement = (element, index) => wrapper.find(element).at(index);

describe("Login component", () => {
  describe("component snapshot", () => {
    test("should match the right snapshot", () => {
      expect(toJson(wrapper)).toMatchSnapshot();
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
      instance = wrapper.instance();
      jest.spyOn(instance, "handleOnChange");
      jest.spyOn(instance, "handleSubmit");
      jest.spyOn(instance, "handleNavigation");
      jest.spyOn(instance, "handleSocialAuth");
    });

    afterEach(() => {
      instance.handleOnChange.mockClear();
      instance.handleSubmit.mockClear();
      instance.handleNavigation.mockClear();
      instance.handleSocialAuth.mockClear();
      mockedFormData.mockClear();
      handleSignIn.mockClear();
      handleTextInput.mockClear();
      wrapper.setProps({
        ...props
      });
    });

    test("handles input change for email field", () => {
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

    test("handles input change for email field", () => {
      findElement(TextInput, 1).simulate("change", {
        target: formData.password
      });
      expect(instance.handleOnChange.mock.calls.length).toBe(1);
      expect(instance.handleOnChange).toHaveBeenCalledWith({
        target: formData.password
      });
    });

    test("should signIn user if email and password are provided", () => {
      mockedFormData.mockReturnValue({});
      Validator.formData = mockedFormData.bind(Validator);
      wrapper.setProps({
        password: formData.password.value,
        email: formData.email.value
      });
      findElement(FormButton, 0).simulate("click");
      expect(instance.handleSubmit.mock.calls.length).toBe(1);
      wrapper.setProps({
        loginSuccess: true
      });
      expect(instance.props.history).toContain("/");
      expect(handleSignIn).toHaveBeenCalledWith({
        email: formData.email.value,
        password: formData.password.value
      });
    });

    test("should redirect the user to the next url on log in", () => {
      localStorage.__STORE__.setItem("token", "helloWorld");
      mockedFormData.mockReturnValue({});
      Validator.formData = mockedFormData.bind(Validator);
      wrapper.setProps({
        password: formData.password.value,
        email: formData.email.value,
        loginSuccess: true,
        location: { search: "?next=/articles/new" }
      });
      findElement(FormButton, 0).simulate("click");

      expect(instance.props.history).toContain("/articles/new");
      localStorage.__STORE__.clear();
    });

    test("should not signIn user if email and password are not provided", () => {
      const errors = { email: "Email is required" };
      mockedFormData.mockReturnValue({ ...errors });
      Validator.formData = mockedFormData.bind(Validator);
      wrapper.setProps({
        email: "",
        password: "password"
      });
      findElement(FormButton, 0).simulate("click");
      expect(instance.handleSubmit.mock.calls.length).toBe(1);
      expect(handleSignIn).not.toHaveBeenCalledWith({
        email: props.email,
        password: props.password
      });
      expect(wrapper.state().errors).toEqual({
        ...errors
      });
      expect(instance.handleNavigation).not.toBeCalled();
    });

    test("calls login with facebook", () => {
      findElement(SocialButton, 0).simulate("click");
      global.open = jest.fn();
      expect(instance.handleSocialAuth.mock.calls.length).toBe(1);
      expect(socialAuth).toBeCalledWith("facebook");
    });

    test("calls login with twitter ", () => {
      findElement(SocialButton, 1).simulate("click");
      global.open = jest.fn();
      expect(instance.handleSocialAuth.mock.calls.length).toBe(1);
      expect(socialAuth).toBeCalledWith("twitter");
    });

    test("calls login with Google ", () => {
      findElement(SocialButton, 2).simulate("click");
      global.open = jest.fn();
      expect(instance.handleSocialAuth.mock.calls.length).toBe(1);
      expect(socialAuth).toBeCalledWith("google");
    });
  });

  describe("rendered component", () => {
    let instance;
    beforeEach(() => {
      instance = wrapper.instance();
      jest.spyOn(instance, "handleNavigation");
    });

    afterEach(() => [
      wrapper.setProps({
        ...props
      })
    ]);

    test("should render without an error", () => {
      expect(wrapper.find(`[data-test="login"]`).length).toBe(1);
    });

    test("should render two part of the screen", () => {
      expect(wrapper.find(`[data-test="auth-left"]`).length).toBe(1);
      expect(wrapper.find(`[data-test="auth-right"]`).length).toBe(1);
    });

    test("should render all basic components", () => {
      expect(wrapper.find(`[data-test="logo"]`).length).toBe(2);
      expect(wrapper.find(`[data-test="login-form"]`).length).toBe(1);
      expect(wrapper.find(`[data-test="nav-link"]`).length).toBe(2);
      expect(wrapper.find(SocialButton).length).toBe(3);
    });

    test("should render two TextInputs and button", () => {
      expect(wrapper.find(TextInput).length).toBe(2);
      expect(wrapper.find(FormButton).length).toBe(1);
    });

    test("should navigate to sign up page", () => {
      findElement(BasicButton, 0).simulate("click");
      expect(instance.handleNavigation.mock.calls.length).toBe(1);
    });

    test("should render component with initial props", () => {
      wrapper.find(TextInput).forEach(input => {
        expect(input.props().value).toBe("");
      });
    });

    test("returns all mapped props from redux", () => {
      expect(mapStateToProps({ auth: { ...INITIAL_STATE } })).toEqual({
        ...INITIAL_STATE
      });
    });
  });
});
