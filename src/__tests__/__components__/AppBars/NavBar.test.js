import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import {
  Navbar,
  mapStateToProps
} from "../../../components/common/AppBars/Navbar";
import TextInput from "../../../components/common/Inputs/TextInput";
import SearchPopOver from "../../../components/PopOvers/SearchPopOver";

const [authSuggestArticles, fetchResults, push,fetchNotifications, deleteNotification, readNotification] = new Array(
  6
).fill(jest.fn());

const props = {
  authSuggestArticles,
  fetchResults,
  searchQuery: "",
  history: {
    push,
    location: {
      pathname: "/"
    }
  },
  suggestedArticles: {},
  isLoggedIn: true,
  notifier: {
    notifications: [{ id: "1", ref: "lkadj", message: "hadlfkj" }],
    isFetching: false
  },
  fetchNotifications,
  readNotification,
  deleteNotification
};

const wrapper = shallow(<Navbar {...props} />);
jest.useFakeTimers();

describe("NavBar component", () => {
  describe("rendered component", () => {
    test("should match the snapshot", () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    test("should contain text input", () => {
      expect(wrapper.find(TextInput).length).toEqual(1);
    });

    test("should search popover not displayed", () => {
      expect(wrapper.find(SearchPopOver).length).toEqual(0);
    });
  });

  describe("search implementations", () => {
    let instance;
    beforeEach(() => {
      instance = wrapper.instance();
      jest.spyOn(instance, "setSearchPopOverRef");
      jest.spyOn(instance, "handleEnterPress");
      jest.spyOn(instance, "closeSearchPopOver");
      jest.spyOn(instance, "handleOnChange");
      jest.spyOn(instance, "onNotificationClick");
      jest.spyOn(instance, "onNotificationClose");
      jest.spyOn(instance, "setWrapperRef");
      jest.spyOn(instance, "handleClickOutside");
    });

    afterEach(() => {
      instance.handleEnterPress.mockClear();
      instance.closeSearchPopOver.mockClear();
      instance.handleOnChange.mockClear();
    });

    test("should response to search input change", () => {
      wrapper
        .find(TextInput)
        .at(0)
        .simulate("change", {
          target: {
            value: "hello world"
          }
        });
      expect(instance.handleOnChange).toBeCalledWith(
        wrapper.state().searchQuery
      );
      jest.runOnlyPendingTimers();
      expect(setTimeout).toBeCalled();
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
      expect(authSuggestArticles).toHaveBeenLastCalledWith(
        wrapper.state().searchQuery
      );
    });

    test("should response to search input change", () => {
      wrapper.setState({
        searchQuery: "Hello world"
      });
      wrapper
        .find(TextInput)
        .at(0)
        .simulate("keydown", { keyCode: 13, shiftKey: false });
      expect(instance.handleEnterPress).toHaveBeenLastCalledWith({
        keyCode: 13,
        shiftKey: false
      });
      expect(fetchResults).toBeCalled();
    });

    test("should call onNotificationClick", () => {
      wrapper
        .find(`[data-test="notif-click"]`)
        .at(0)
        .simulate("click");
      expect(instance.onNotificationClick).toHaveBeenCalledWith(
        props.notifier.notifications[0]
      );
      wrapper
        .find(`[data-test="notif-click"]`)
        .at(0)
        .simulate("keypress", { which: 13 });
      expect(instance.onNotificationClick).toHaveBeenCalledWith(
        props.notifier.notifications[0]
      );
    });
    test("should call close notificaiton", () => {
      wrapper
        .find(`[data-test="notif-close"]`)
        .at(0)
        .simulate(`click`);
      expect(instance.onNotificationClose).toHaveBeenCalledWith(
        props.notifier.notifications[0]
      );
    });

    test("should call setWrapperRef", () => {
      wrapper
        .find(`[data-test="notif-close"]`)
        .at(0)
        .simulate(`click`);
      expect(instance.onNotificationClose).toHaveBeenCalledWith(
        props.notifier.notifications[0]
      );
      expect(deleteNotification).toHaveBeenCalledWith(
        props.notifier.notifications[0].id
      );
    });

    test("should toggle the isUserDetailsOpen state from FALSE to TRUE and vice-versa", () => {
      const previous = instance.state.isUserDetailsOpen;
      wrapper.find(`[data-test="user-dropdown"]`).simulate(`click`);
      expect(instance.state.isUserDetailsOpen).toBe(!previous);
    });

    test("should toggle the isNotificationOpen state from FALSE to TRUE and vice-versa", () => {
      const previous = instance.state.isNotificationOpen;
      wrapper.find(`[data-test="notif-button"]`).simulate(`click`);
      expect(instance.state.isNotificationOpen).toBe(!previous);
    });

    describe("map state and dispatch to props", () => {
      it("should show previously rolled value", () => {
        const initialState = {
          notifier: {
            isFetching: false,
            errorMessage: null,
            notifications: []
          },
          auth: { currenrUser: "Diane" }
        };
        expect(mapStateToProps(initialState).notifier.isFetching).toEqual(
          false
        );
      });
    });
  });
});
