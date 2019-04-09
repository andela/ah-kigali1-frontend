import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";
import Login from "../../views/Login";
import TextInput from "../../components/common/Inputs/TextInput";
import FormButton from "../../components/common/Buttons/FormButton";
import BasicButton from "../../components/common/Buttons/BasicButton";
const setUp = (props = {}) => {
  const state = {
    email: "",
    password: "",
    isSubmitting: false
  };
  const wrapper = shallow(<Login {...props} />);
  return { state, wrapper };
};
describe("Login component", () => {
  let component;
  beforeEach(() => {
    sinon.spy(Login.prototype, "handleTextInput");
    sinon.spy(Login.prototype, "handleSubmit");
    sinon.spy(Login.prototype, "handleNavigation");
    const { wrapper, state } = setUp();
    component = wrapper;
  });
  afterEach(() => {
    Login.prototype.handleTextInput.restore();
    Login.prototype.handleSubmit.restore();
    Login.prototype.handleNavigation.restore();
  });
  describe("component render", () => {
    it("should render without an error", () => {
      expect(component.find(`[data-test="login"]`).length).toBe(1);
      expect(component).toMatchSnapshot();
    });
    it("should render two part of the screen", () => {
      expect(component.find(`[data-test="auth-left"]`).length).toBe(1);
      expect(component.find(`[data-test="auth-right"]`).length).toBe(1);
    });
    it("should render all basic components", () => {
      expect(component.find(`[data-test="logo"]`).length).toBe(2);
      expect(component.find(`[data-test="login-form"]`).length).toBe(1);
      expect(component.find(`[data-test="nav-link"]`).length).toBe(2);
      expect(component.find(`[data-test="socials"] .icon`).length).toBe(3);
    });
    it("should render two TextInputs and button", () => {
      expect(component.find(TextInput).length).toBe(2);
      expect(component.find(FormButton).length).toBe(1);
    });
    it("should navigate to signup page", () => {
      component
        .find(BasicButton)
        .at(0)
        .simulate("click");
      expect(Login.prototype.handleNavigation.calledOnce).toBe(true);
    });
    it("should render component with initial props", () => {
      expect(component.state().email).toBe("");
      expect(component.state().password).toBe("");
    });
    it("should call handleTextInput when user enter input", () => {
      component
        .find(TextInput)
        .at(0)
        .simulate("change", {
          target: {
            name: "email",
            value: "luc.bayo@gmail.com"
          }
        });

      expect(Login.prototype.handleTextInput.calledOnce).toBe(true);
      expect(component.state().email).toEqual("luc.bayo@gmail.com");
    });
    it("should update password input value", () => {
      component
        .find(TextInput)
        .at(1)
        .simulate("change", {
          target: {
            name: "password",
            value: "password"
          }
        });
      expect(Login.prototype.handleTextInput.calledOnce).toBe(true);
      expect(component.state().password).toEqual("password");
    });
    it("should submit user input", () => {
      component
        .find(FormButton)
        .at(0)
        .simulate("click");
      expect(Login.prototype.handleSubmit.calledOnce).toBe(true);
      expect(component.state().isSubmitting).toBe(true);
    });
  });
});
