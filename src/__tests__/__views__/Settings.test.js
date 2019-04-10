import React from "react";
import { mount, shallow } from "enzyme";
import {
  Settings,
  mapStateToProps,
  mapDispatchToProps
} from "../../views/Settings";

const initialState = {
  user: { loading: true, error: null, profile: {} },
  auth: { currentUser: { username: "username" } }
};
let props = {
  profile: {
    firstName: "Fabrice",
    lastName: "NIYOMWUNGERI",
    bio: "software dev",
    username: "username",
    email: "admin@email.com",
    phone: "909384540593",
    address: "Kigali",
    allowNotifications: false
  },
  state: {
    currentState: "emailSettings",
    validationError: "",
    isPasswordMatching: true,
    validationColor: "red"
  },
  password: "hello",
  confirmPassword: "hello World",
  currentPassword: "12fgf",
  loggedInUser: { username: "username" },
  currentUser: jest.fn(),
  updatedUser: jest.fn(),
  onChangePassword: jest.fn(),
  onInputChange: jest.fn().mockImplementation(() => Promise.resolve()),
  onClearMessage: jest.fn(),
  onDeleteProfile: jest.fn()
};
describe("Settings", () => {
  describe("localStates", () => {
    describe("currentState", () => {
      test("should change the state", () => {
        const wrapper = mount(<Settings {...props} />);
        wrapper.setState({ currentState: "emailSettings" });
        expect(wrapper.props().state.currentState).toEqual("emailSettings");
      });

      test("should set passwordSettings state", () => {
        const wrapper = mount(<Settings {...props} />);
        wrapper.setState({ currentState: "passwordSettings" });
        expect(wrapper.state().currentState).toEqual("passwordSettings");
      });

      test("should set accountSettings state", () => {
        const wrapper = shallow(<Settings {...props} />);
        wrapper.setState({ currentState: "accountSettings" });
        expect(wrapper.state().currentState).toEqual("accountSettings");
      });
    });
  });

  /**
   * @description when current currentState === emailSettings
   */
  describe("currentUser()", () => {
    test("should change current section", () => {
      const wrapper = mount(<Settings {...props} />);
      wrapper
        .find("li")
        .first()
        .simulate("click");
      expect(props.currentUser).toHaveBeenCalled();
    });
  });
  describe("updatedUser()", () => {
    test("should change notifications button", () => {
      const wrapper = mount(<Settings {...props} />);
      wrapper.find(".onoffswitch-checkbox").simulate("change");
      expect(props.updatedUser).toHaveBeenCalled();
    });

    test("should call onChangePassword", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onChangePassword(props);
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
  });

  /**
   * @description when current currentState === passwordSettings
   */

  describe("onInputChange()", () => {
    test("should simulate change", () => {
      const wrapper = mount(<Settings {...props} />);
      wrapper.setState({ currentState: "passwordSettings" });
      wrapper
        .find(".input-change")
        .first()
        .simulate("change");
      expect(props.onInputChange).toHaveBeenCalled();
    });

    test("should simulate when password matches", () => {
      props = {
        ...props,
        confirmPassword: "HelloWorld",
        password: "HelloWorld"
      };
      const wrapper = mount(<Settings {...props} />);
      wrapper.setState({ currentState: "passwordSettings" });
      wrapper
        .find(".input-change")
        .first()
        .simulate("change");
      expect(props.onInputChange).toHaveBeenCalled();
    });
  });

  describe("onInputChange()", () => {
    test("should simulate change password", () => {
      const wrapper = mount(<Settings {...props} />);
      wrapper.setState({
        currentState: "passwordSettings",
        isPasswordMatching: false
      });
      wrapper
        .find(".changePassCode")
        .first()
        .simulate("click");
      expect(props.onChangePassword).toHaveBeenCalled();
    });
  });

  describe("mapStateToProps()", () => {
    test("should call currentUser", () => {
      const state = mapStateToProps(initialState);
      expect(state.error).toEqual(null);
    });
  });

  describe("mapDispatchToProps()", () => {
    test("should call currentUser dispatch", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).currentUser();
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    test("should call onChangePassword dispatch", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onChangePassword();
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    test("should call onInputChange dispatch", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onInputChange();
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    test("should call saveUpdatedUser dispatch", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).updatedUser();
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    test("should call deleteProfile dispatch", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onDeleteProfile();
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
  });
});
