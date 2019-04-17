import React from "react";
import { shallow, mount } from "enzyme";
import {
  Settings,
  mapStateToProps,
  mapDispatchToProps
} from "../../views/Settings";

const initialState = {
  user: { loading: true, error: null, profile: {} }
};
const props = {
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
    currentState: "emailSettings"
  },
  currentUser: jest.fn(),
  updatedUser: jest.fn()
};
describe("Settings", () => {
  describe("currentUser()", () => {
    test("should change the state", () => {
      const wrapper = mount(<Settings {...props} />);
      wrapper.setState({ currentState: "emailSettings" });
      expect(wrapper.props().state.currentState).toEqual("emailSettings");
    });
    test("should set accountSettings state", () => {
      const wrapper = mount(<Settings {...props} />);
      wrapper.setState({ currentState: "passwordSettings" });
      expect(wrapper.state().currentState).toEqual("passwordSettings");
    });
    test("should set passwordSettings state", () => {
      const wrapper = mount(<Settings {...props} />);
      wrapper.setState({ currentState: "accountSettings" });
      expect(wrapper.state().currentState).toEqual("accountSettings");
    });

    test("should call currentUser", () => {
      const wrapper = mount(<Settings {...props} />);
      wrapper
        .find("li")
        .first()
        .simulate("click");
      expect(props.currentUser).toHaveBeenCalled();
    });
  });
  describe("updatedUser()", () => {
    const wrapper = mount(<Settings {...props} />);
    wrapper.find(".allow_notifications").simulate("change");
    expect(props.updatedUser).toHaveBeenCalled();
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
    test("should call updatedUser", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).updatedUser(props.profile);
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
  });
});
