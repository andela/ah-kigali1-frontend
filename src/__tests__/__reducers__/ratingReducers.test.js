import {
  RATING_ARTICLE,
  RATING_FAILURE,
  RATING_SUCCESS,
  RATING_FOUND
} from "../../redux/actionTypes";
import ratingReducer from "../../redux/reducers/ratingReducer";

describe("Rating reducer ", () => {
  test("should return the initial state ", () => {
    expect(ratingReducer(undefined, {})).toEqual({
      ratingInProgress: false,
      rate: {
        ratings: []
      }
    });
  });

  test("should return rating in progress", () => {
    expect(ratingReducer(undefined, { type: RATING_ARTICLE })).toEqual({
      ratingInProgress: true,
      rate: {
        ratings: []
      }
    });
  });

  test("should return rating success ", () => {
    expect(
      ratingReducer(undefined, {
        type: RATING_SUCCESS,
        payload: "Article rated successfully"
      })
    ).toEqual({
      ratingInProgress: false,
      rate: "Article rated successfully"
    });
  });

  test("should return ratings found ", () => {
    expect(
      ratingReducer(undefined, {
        type: RATING_FOUND,
        payload: "Article ratings retrieved successfully"
      })
    ).toEqual({
      ratingInProgress: false,
      rate: "Article ratings retrieved successfully"
    });
  });

  test("should return rating error ", () => {
    expect(
      ratingReducer(undefined, {
        type: RATING_FAILURE,
        payload: "Cannot rate article twice"
      })
    ).toEqual({
      ratingInProgress: false,
      rate: "Cannot rate article twice"
    });
  });
});
