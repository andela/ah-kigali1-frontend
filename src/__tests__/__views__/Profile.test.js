import React from "react";
import { shallow, mount } from "enzyme";
import {
  Profile,
  mapStateToProps,
  mapDispatchToProps
} from "../../views/Profile";

const initialState = {
  user: { loading: true, error: null, profile: {} }
};
let props = {
  profile: {
    firstName: "Fabrice",
    lastName: "NIYOMWUNGERI",
    bio: "software dev"
  },
  fetchCurrentUser: jest.fn()
};
describe("Profile", () => {
  test("renders without crashing", () => {
    const wrapper = shallow(<Profile {...props} />);
    expect(wrapper.find("h1").text()).toEqual("Fabrice NIYOMWUNGERI");
  });
  test("when loading is true", () => {
    props = { ...props, loading: true };
    const wrapper = mount(<Profile {...props} />);
    expect(wrapper.props().loading).toEqual(true);
  });
  test("when error is thrown", () => {
    props = { ...props, loading: false, error: "Database error" };
    const wrapper = mount(<Profile {...props} />);
    expect(wrapper.props().error).toEqual("Database error");
  });
  test("should return true on loading", () => {
    expect(mapStateToProps(initialState).loading).toEqual(true);
    expect(mapStateToProps(initialState).profile).toEqual({});
    expect(mapStateToProps(initialState).error).toEqual(null);
  });
  test("should test dispatch", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).getCurrentUser();
    expect(props.fetchCurrentUser).toHaveBeenCalled();
  });
});
