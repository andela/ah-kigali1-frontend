/* eslint-disable no-underscore-dangle */
import { mount } from "enzyme";
import "@babel/polyfill";
import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { checkAuthComponent } from "../../utils/checkAuthUtils";
import { EditArticle } from "../../views/EditArticle";
import { article } from "../__mocks__/testData";

describe("should test the check authenticated component", () => {
  const initialState = { article };
  const mockStore = configureStore();
  let wrapper;
  let store;
  let ConditionalComponent;
  const nextUrl = "/articles/new";
  beforeEach(() => {
    const props = {
      article,
      match: {
        params: {
          slug: "hello-world"
        }
      },
      response: "",
      location: { pathname: nextUrl },
      history: []
    };
    store = mockStore(initialState);
    ConditionalComponent = checkAuthComponent(EditArticle);
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConditionalComponent {...props} />
        </MemoryRouter>
      </Provider>
    ).find("AuthenticatedComponent");
  });

  afterEach(() => {
    localStorage.__STORE__.clear();
  });

  test("should redirect to next url if not logged in", () => {
    localStorage.__STORE__.setItem("token", "");
    expect(wrapper.props().history).toContain(`/sign_in?next=${nextUrl}`);
  });

  test("should return next component if the user is authenticated", () => {
    localStorage.__STORE__.setItem("token", "helloWorld");
    expect(wrapper.isEmptyRender()).not.toBeTruthy();
  });
});
