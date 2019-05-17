import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import { mapDispatchToProps, Article } from "../../views/ReadArticle";
import { Comments } from "../../views/Comments";
import { props1 } from "../__mocks__/testData";

const mockStore = configureMockStore([thunk]);
const store = mockStore({});
const props = {
  comments: [
    {
      articleId: "9ffef127-9f6c-4194-bed1-b9abdf6e41c2",
      author: {
        firstName: "Fabrice",
        lastName: "NIYOMWUNGERI",
        username: "username4"
      },
      body:
        "The standard Lorem Ipsum passage, used since the 1500s Lorem ipsum dolor sitThe standard Lorem Ipsum passage, used since the 1500s Lorem ipsum dolor sitThe standard Lorem Ipsum passage, used since the 1500s Lorem ipsum dolor",
      id: "d0be9663-4599-411c-97c8-8ed1bef603d3"
    }
  ],
  onSetBodyEdit: jest.fn(),
  editComment: jest.fn(),
  currentUser: {
    email: "email@email.com",
    username: "username4"
  },
  onLikeComment: jest.fn(),
  reportArticle: jest.fn(),
  likeComment: jest.fn(),
  fetchRatings: jest.fn(),
  profile: {
    email: "",
    username: "",
    address: "",
    allowNotifications: true,
    bio: "",
    firstName: "",
    gender: "",
    image: "",
    lastName: "",
    password: "",
    phone: "",
    socialId: ""
  }
};
const body = "comment";
const slug = "slugofanarticle";
const commentId = "dflkdjflksd84n839";
describe("Comments", () => {
  describe("Event Handlers", () => {
    test("should simulate click on onSetBodyEdit", () => {
      const wrapper = shallow(<Comments {...props} />);
      wrapper.find(".edit-comment").simulate("click");
      expect(props.onSetBodyEdit).toHaveBeenCalled();
    });

    test("should simulate click on onLike", () => {
      const wrapper = shallow(<Comments {...props} />);
      wrapper.setState({ ind: 0, editMode: false });
      wrapper.find("#like-heart").simulate("click");
      expect(props.likeComment).toHaveBeenCalled();
    });

    test("should simulate click on editComment", () => {
      const wrapper = shallow(<Comments {...props} />);
      wrapper.setState({ ind: 0, editMode: true });
      wrapper.find("#update-comment").simulate("click");
      expect(props.editComment).toHaveBeenCalled();
    });

    test("should simulate click to change the state", () => {
      const wrapper = shallow(<Comments {...props} />);
      wrapper.setState({ ind: 0, editMode: true });
      wrapper.find("#close-update-comment").simulate("click");
      expect(wrapper.state().editMode).toBe(false);
    });

    test("should simulate click on editComment on enter", () => {
      const wrapper = shallow(<Comments {...props} />);
      wrapper.setState({ ind: 0, editMode: true });
      const input = wrapper.find("#edit-comment-textarea");
      input.simulate("change", { target: { value: "abcdefg" } });
      input.simulate("keydown", { keyCode: 13 }, { preventDefault: () => {} });
      expect(props.editComment).toHaveBeenCalled();
    });

    test("should simulate click on creat a comment on enter", () => {
      const wrapper = mount(
        <Provider store={store}>
          <Router>
            <Article {...props1} />
          </Router>
        </Provider>
      );
      const input = wrapper.find(".comment-textarea").at(1);
      input.simulate("change", { target: { value: "abcdefg" } });
      input.simulate("keydown", { keyCode: 13, shiftKey: false });
      expect(props1.onCreateComments).toHaveBeenCalled();
    });

    test("should simulate click on creat a comment on enter", () => {
      const wrapper = mount(<Comments {...props} />);
      wrapper.setState({ ind: 0, editMode: true });
      const input = wrapper.find("#edit-comment-textarea").at(1);
      input.simulate("change", { target: { value: "abcdefg" } });
      input.simulate("keydown", { keyCode: 13, shiftKey: false });
      expect(props.editComment).toHaveBeenCalled();
    });

    test("should simulate click on creat a comment", () => {
      const wrapper = mount(
        <Provider store={store}>
          <Router>
            <Article {...props1} />
          </Router>
        </Provider>
      );
      wrapper.setState({ isCommentEmpty: false });
      const input = wrapper.find(".delete_article").at(1);
      input.simulate("click");
      expect(props1.onCreateComments).toHaveBeenCalled();
    });

    describe("Article > Comment", () => {
      test("should change state after editing", () => {
        const wrapper = mount(
          <Provider store={store}>
            <Router>
              <Article {...props1} />
            </Router>
          </Provider>
        );
        const component = wrapper
          .find("Comments")
          .setState({ ind: 0, editMode: true });
        wrapper
          .find("#update-comment")
          .first()
          .simulate("click");
        expect(component.state().editMode).toBe(false);
      });

      test("should change call function to set input", () => {
        const wrapper = mount(
          <Provider store={store}>
            <Router>
              <Article {...props1} />
            </Router>
          </Provider>
        );
        wrapper.find("Comments");
        wrapper
          .find(".comment-textarea")
          .at(1)
          .simulate("change", { target: { value: "abcdefg" } });
        expect(props1.onHandleCommentsInput).toHaveBeenCalled();
      });

      test("should change call function to set input on edit", () => {
        const wrapper = mount(
          <Provider store={store}>
            <Router>
              <Article {...props1} />
            </Router>
          </Provider>
        );
        wrapper.find("Comments").setState({ ind: 0, editMode: true });
        wrapper
          .find("#edit-comment-textarea")
          .at(1)
          .simulate("change", { target: { value: "abcdefg" } });
        expect(props1.onHandleCommentsInputEdit).toHaveBeenCalled();
      });
    });
  });

  describe("mapDispatchToProps()", () => {
    test("handleCommentsInput()", () => {
      const dispatch = jest.fn();
      const payload = { field: "body", value: "comments body" };
      mapDispatchToProps(dispatch).onHandleCommentsInput(payload);
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    test("onHandleCommentsInputEdit()", () => {
      const dispatch = jest.fn();
      const payload = { field: "body", value: "comments body" };
      mapDispatchToProps(dispatch).onHandleCommentsInputEdit(payload);
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    test("onCreateComments()", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onCreateComments(body, slug);
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    test("onDeleteComment()", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onDeleteComment(commentId, slug);
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    test("onUpdateComment()", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onUpdateComment(body, slug);
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    test("onFetchComments()", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onFetchComments(commentId, slug);
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    test("onSetBodyEdit()", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onSetBodyEdit(body);
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    test("onLikeComment()", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).onLikeComment(commentId, slug);
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });

    test("reportArticle()", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).reportArticle("dkjflkdsf", slug);
      expect(dispatch.mock.calls[0][0]).toBeDefined();
    });
  });
});
