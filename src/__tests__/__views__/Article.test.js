import React from "react";
import Enzyme, { mount } from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import {
  Article,
  mapStateToProps,
  mapDispatchToProps
} from "../../views/Article";
import { initialState } from "../../redux/reducers/likeReducers";

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  const props = {
    like: jest.fn(),
    dislike: jest.fn(),
    likeCount: 0,
    isLiked: false
  };
  const enzymeWrapper = mount(<Article {...props} />);

  return {
    props,
    enzymeWrapper
  };
};

describe("tes like component", () => {
  const { props } = setup();
  const likeComponent = mount(<Article {...props} />);
  let instance;
  beforeEach(() => {
    instance = likeComponent.instance();
    jest.spyOn(instance.props, "like");
    jest.spyOn(instance.props, "dislike");
    instance.forceUpdate();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("snapshot testing for the component", () => {
    expect(toJson(likeComponent)).toMatchSnapshot();
    expect(likeComponent).toBeTruthy();
  });

  it("should render the component", () => {
    expect(likeComponent.find("div").length).toBe(3);
    expect(likeComponent.find("p").length).toBe(1);
    expect(likeComponent.find("p").text()).toEqual(props.likeCount.toString());
  });

  describe("handle event on like dislike button", () => {
    // test button color change

    it("should handle click like event ", () => {
      const likeButton = likeComponent
        .find("div")
        .at(1)
        .at(0)
        .find("img");
      likeButton.simulate("click", {});
      expect(instance.props.like).toHaveBeenCalled();
    });

    it("should handle click dislike event ", () => {
      props.isLiked = true;
      const likedComponent = mount(<Article {...props} />);
      const dislikeButton = likedComponent
        .find("div")
        .at(2)
        .at(0)
        .find("img");
      dislikeButton.simulate("click", {});
      expect(instance.props.dislike).toHaveBeenCalled();
    });
  });
  describe("test map state to props and map dispatch to props", () => {
    it("should test map state to props", () => {
      expect(mapStateToProps({ like: initialState })).toEqual({
        likeCount: 0,
        isSubmitting: false,
        message: "",
        isLiked: false
      });
    });
    it("should test map dispatch to props for like", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).like();
      expect(dispatch.mock.calls[0][0]).toBeInstanceOf(Function);
    });

    it("should test map dispatch to props for dislike", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).dislike();
      expect(dispatch.mock.calls[0][0]).toBeInstanceOf(Function);
    });
  });
});
