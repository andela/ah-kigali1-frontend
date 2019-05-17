import "@babel/polyfill";
import React from "react";
import { shallow } from "enzyme";
import RatingForm from "../../../components/common/RatingForm/RatingForm";
import Rate from "../../../components/common/Buttons/RatingButton";

const params = {
  slug: "helloWorld",
  rate: {
    rate: {
      ratings: [{ rating: 0 }, { rating: 2 }]
    }
  },
  rateArticle: jest.fn(),
  fetchRatings: jest.fn()
};
const shallowSetup = props => {
  const wrapper = shallow(<RatingForm {...props} />);
  return { wrapper, props };
};
describe("Rating section", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.runAllTimers();
  });
  afterEach(() => {
    params.fetchRatings.mockClear();
  });
  test("should render the rating section", () => {
    const { wrapper } = shallowSetup(params);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Rate)).toHaveLength(1);
  });

  test("should open the rating section and later close it", () => {
    const { wrapper } = shallowSetup(params);
    wrapper
      .find(Rate)
      .at(0)
      .simulate("click");
    expect(wrapper.state().openRatingForm).toEqual(true);
  });

  test("should close the rating form", () => {
    const { wrapper } = shallowSetup(params);
    wrapper.setState({ openRatingForm: true });
    wrapper.instance().toggleShowRatingForm();
    expect(wrapper.state().openRatingForm).toEqual(false);
  });

  test("should call the rate article method ", async () => {
    const { wrapper, props } = shallowSetup(params);
    await props.rateArticle.mockResolvedValue("hello world");
    wrapper.setState({ openRatingForm: true });

    wrapper.instance().onStarClick(2);
    expect(props.rateArticle).toHaveBeenCalledWith(params.slug, 2);
  });

  test("should fetch ratings of a different article ", async () => {
    const { wrapper, props } = shallowSetup(params);
    await props.fetchRatings.mockResolvedValue("hello world");
    wrapper.setProps({ slug: "new-planet-visit-haela21" });
    expect(props.fetchRatings).toHaveBeenCalledWith("new-planet-visit-haela21");
  });

  test("should not fetch ratings for the same article ", async () => {
    const { wrapper, props } = shallowSetup(params);
    props.fetchRatings.mockReset();
    wrapper.setProps({ slug: "helloWorld" });
    expect(props.fetchRatings).not.toHaveBeenCalled();
  });
});
