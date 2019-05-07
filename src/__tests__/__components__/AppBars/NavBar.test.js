import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import { Navbar } from "../../../components/common/AppBars/navBar";
import TextInput from "../../../components/common/Inputs/TextInput";
import SearchPopOver from "../../../components/PopOvers/SearchPopOver";

const [authSuggestArticles, fetchResults, push] = new Array(3).fill(jest.fn());

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
  suggestedArticles: {}
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
  });
});
