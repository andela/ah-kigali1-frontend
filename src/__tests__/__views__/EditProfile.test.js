import React from "react";
import { mount } from "enzyme";
import {
  mapStateToProps,
  mapDispatchToProps,
  EditProfile
} from "../../views/EditProfile";
import { fieldRemover } from "../../helpers/helpers";
import imagePath from "../../assets/img/circle-loading.gif";

const initialState = {
  user: { loading: true, error: null, loggedInUser: {} }
};
const props = {
  loggedInUser: {
    firstName: "Fabrice",
    lastName: "NIYOMWUNGERI",
    bio: "software dev",
    username: "username",
    email: "admin@email.com",
    phone: "909384540593",
    address: "Kigali",
    image: "https://res.cloudinary.com/kdhlls/dkjfd"
  },
  match: {
    params: "username"
  },
  onFetchCurrentUser: jest.fn(),
  onInputChange: jest.fn(),
  onUploadImage: jest.fn().mockImplementation(() => Promise.resolve()),
  onSaveUpdatedUser: jest.fn()
};

describe("Edit Profile", () => {
  localStorage.setItem("token", "kkdjfd");
  describe("mapStateToProps()", () => {
    test("should call onInputChange action", () => {
      const state = mapStateToProps(initialState);
      expect(state.error).toEqual(null);
    });
    test("onInputChange()", () => {
      const wrapper = mount(<EditProfile {...props} />);
      wrapper
        .find(".input_field")
        .first()
        .simulate("change", { target: { value: "hello" } });
      expect(props.onInputChange).toHaveBeenCalled();
    });
    test("should trigger click event", () => {
      const wrapper = mount(<EditProfile {...props} />);
      wrapper
        .find("Confirm")
        .first()
        .simulate("click");
      expect(props.onSaveUpdatedUser).toHaveBeenCalled();
    });
  });

  describe("mapDispatchToProps()", () => {
    test("should call onInputChange action", () => {
      const dispatch = jest.fn();
      const payload = { field: "email", value: "email@email.com" };
      const expectedActions = {
        type: "SET_FORM_INPUT",
        payload
      };
      mapDispatchToProps(dispatch).onInputChange(payload);
      expect(dispatch.mock.calls[0][0]).toEqual(expectedActions);
    });
    test("should call saveUpdatedUser action", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onSaveUpdatedUser(
        fieldRemover(props.loggedInUser)
      );
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
    test("should call uploadImage action", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onUploadImage(imagePath);
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
    test("should call saveUpdatedUser action", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onFetchCurrentUser();
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
    test("uploadImage()", () => {
      const wrapper = mount(<EditProfile {...props} />);
      const file = {
        name: "DF5A9012.JPG",
        size: 1679136,
        type: "image/jpeg"
      };
      wrapper
        .find(".profile_picture")
        .simulate("change", { target: { files: [file] } });
      expect(props.onUploadImage).toHaveBeenCalled();
    });
  });
  localStorage.setItem("token", "");
});
