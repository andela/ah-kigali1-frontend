import "@babel/polyfill";
import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import { MemoryRouter } from "react-router-dom";
import { SignUp, mapStateToProps } from "../../views/SignUp";

const setup = () => {
  const props = {
    InputChange: jest.fn(),
    register: jest.fn(),
    blur: jest.fn(),
    user: {
      email: "test",
      username: "test",
      password: "test",
      confirmPassword: "test"
    },
    submitted: false,
    message: "",
    success: false,
    dispatch: jest.fn(),
    history: []
  };

  return {
    props
  };
};

describe("Render the sign up page", () => {
  const { props } = setup();

  const registerComponent = mount(
    <MemoryRouter>
      <SignUp {...props} />
    </MemoryRouter>
  ).find("SignUp");

  it("snapshot testing for the component", () => {
    expect(toJson(registerComponent)).toMatchSnapshot();
    expect(registerComponent).toBeTruthy();
  });

  it("should render 3 text input and a button", () => {
    expect(registerComponent.find("input").length).toBe(4);
    expect(
      registerComponent
        .find("input")
        .at(3)
        .props().value
    ).toEqual("Sign Up");
  });

  it("should not display error message when rendering the  component", () => {
    expect(registerComponent.find(".auth-errors").length).toBeFalsy();
  });

  describe("test for events", () => {
    let instance;

    beforeEach(() => {
      instance = registerComponent.find("SignUp").instance();
      jest.spyOn(instance, "handleChange");
      jest.spyOn(instance, "handleSubmit");
      jest.spyOn(instance, "handleBlur");
      instance.forceUpdate();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should handle on change for username", () => {
      const usernameInput = registerComponent.find("input").at(0);
      usernameInput.simulate("change", {
        target: {
          target: "username",
          value: "password"
        }
      });
      expect(instance.handleChange).toHaveBeenCalled();
    });

    it("should handle on change for email", () => {
      const usernameInput = registerComponent.find("input").at(0);
      usernameInput.simulate("change", {
        target: {
          target: "email",
          value: "esp@email.com"
        }
      });
      expect(instance.handleChange).toHaveBeenCalled();
    });

    it("should handle on change for password", () => {
      const usernameInput = registerComponent.find("input").at(0);
      usernameInput.simulate("change", {
        target: {
          target: "password",
          value: "password"
        }
      });
      expect(instance.handleChange).toHaveBeenCalled();
    });

    it("should handle on  blur on all field", () => {
      registerComponent.find("input").forEach(inputField => {
        inputField.simulate("blur", {
          target: {
            target: "test",
            value: "test"
          }
        });

        expect(instance.handleBlur).toHaveBeenCalled();
      });
    });

    it("should handle on submit", () => {
      const submitButton = registerComponent.find("input").at(3);
      submitButton.simulate("click", {});
      expect(instance.handleSubmit).toHaveBeenCalled();
    });

    it("should handle click on sign in button", () => {
      const signInButton = registerComponent.find("BasicButton").at(0);
      signInButton.simulate("click", {});
      expect(registerComponent.props().history).toContain("/sign_in");
    });
  });
});

describe("test if the component displays correct errors message", () => {
  it("should display error message for invalid field", () => {
    const { props } = setup();
    Array.of("email", "username", "password").forEach(field => {
      props.message = `Invalid ${field}`;
      const registerComponent = mount(
        <MemoryRouter>
          <SignUp {...props} />
        </MemoryRouter>
      ).find("SignUp");
      expect(registerComponent.find(".auth-errors").length).toEqual(1);
      expect(registerComponent.find(".danger").text()).toEqual(
        `Invalid ${field}`
      );
    });
  });
});

describe("test if history is updated when registration is successful", () => {
  it("check if pushed", () => {
    const { props } = setup();
    props.success = true;
    const registerComponent = mount(
      <MemoryRouter>
        <SignUp {...props} />
      </MemoryRouter>
    ).find("SignUp");
    expect(registerComponent.props().history).toContain("/home");
  });
});

it("should test map state to props", () => {
  const initialState = {
    user: {
      email: "",
      username: "",
      password: ""
    },
    submitted: false,
    message: "",
    success: false
  };
  expect(mapStateToProps({ registration: initialState })).toEqual(initialState);
});
