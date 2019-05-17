import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import dotenv from "dotenv";
import * as actions from "../../redux/actions/highlightCommentActions";
import {
  UPDATE_BODY_WITH_HIGHLIGHT,
  SET_HIGHLIGHTED_SECTION,
  RESET_ARTICLE_HIGHLIGHT,
  SET_HIGHLIGHTS
} from "../../redux/actionTypes";
import axios from "../../utils/axios";
import { highlights, article } from "../__mocks__/testData";
import { arrayToObject } from "../../utils/helperFunctions";

dotenv.config();
const mockStore = configureMockStore([thunk]);
let store;
const highlightedText = "Ut enim ad minim veniam, quis nostrud";
const startIndex = article.body.indexOf(highlightedText);
const endIndex = startIndex + highlightedText.length - 1;
const data = {
  text: highlightedText,
  slug: `passing-data-to-propschildren-in-react-akn14yrjzc7`,
  startIndex,
  endIndex,
  comment: "hello world"
};
const { API_URL } = process.env;

describe("Highlight and comment actions", () => {
  beforeEach(() => {
    moxios.install(axios);
    window.getSelection = jest.fn().mockReturnValue({
      getRangeAt: () => ({
        cloneContents: () => data.text
      })
    });
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  test("should fetch article highlights and dispatch SET_HIGHLIGHTS", () => {
    const expectations = [
      {
        type: SET_HIGHLIGHTS,
        payload: arrayToObject(highlights, "id")
      }
    ];
    moxios.stubRequest(`${API_URL}/articles/${data.slug}/highlights`, {
      status: 200,
      response: {
        highlights
      }
    });
    store = mockStore({});
    return store.dispatch(actions.fetchHighLights(data.slug)).then(() => {
      expect(store.getActions()).toEqual(expectations);
    });
  });

  test("should dispatch RESET_ARTICLE_HIGHLIGHT on fetch failure", () => {
    const expectations = [
      {
        type: RESET_ARTICLE_HIGHLIGHT
      }
    ];
    moxios.stubRequest(`${API_URL}/articles/${data.slug}/highlights`, {
      status: 404
    });
    store = mockStore({});
    return store.dispatch(actions.fetchHighLights(data.slug)).then(() => {
      expect(store.getActions()).toEqual(expectations);
    });
  });

  test("should save new highlight and dispatch SET_HIGHLIGHTS", () => {
    const expectations = [
      {
        type: SET_HIGHLIGHTS,
        payload: { [highlights[0].id]: { ...highlights[0] } }
      }
    ];
    moxios.stubRequest(
      `${API_URL}/articles/${data.slug}/highlights?start=${
        data.startIndex
      }&end=${data.endIndex}`,
      {
        status: 200,
        response: {
          highlight: highlights[0]
        }
      }
    );
    store = mockStore({});
    return store.dispatch(actions.saveHighlight({ ...data })).then(() => {
      expect(store.getActions()).toEqual(expectations);
    });
  });

  test("should dispatch SET_HIGHLIGHTS on request failure", () => {
    document.createElement = jest.fn().mockReturnValue({
      appendChild: () => {},
      innerHTML: data.text
    });
    const expectations = [
      {
        type: RESET_ARTICLE_HIGHLIGHT
      }
    ];
    moxios.stubRequest(
      `${API_URL}/articles/${data.slug}/highlights?start=${
        data.startIndex
      }&end=${data.endIndex}`,
      {
        status: 404
      }
    );
    store = mockStore({});
    return store.dispatch(actions.saveHighlight({ ...data })).then(() => {
      expect(store.getActions()).toEqual(expectations);
    });
  });

  test("should dispatch SET_HIGHLIGHTED_SECTION", () => {
    const bodyHighlight = article.body.replace(
      data.text,
      `<span class="highlighted">${data.text}</span>`
    );

    const expectations = [
      {
        type: UPDATE_BODY_WITH_HIGHLIGHT,
        payload: bodyHighlight || article.body
      },
      {
        type: SET_HIGHLIGHTED_SECTION,
        payload: { start: data.startIndex, end: data.endIndex }
      }
    ];
    store = mockStore({});
    return store
      .dispatch(
        actions.markHighlightSection({
          body: article.body,
          slug: data.slug,
          text: data.text,
          save: false
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectations);
      });
  });

  test("should dispatch UPDATE_BODY_WITH_HIGHLIGHT  and RESET_ARTICLE_HIGHLIGHT on failure", () => {
    document.createElement = jest
      .fn()
      .mockReturnValue(new Error("No selection"));

    const expectations = [
      {
        type: UPDATE_BODY_WITH_HIGHLIGHT,
        payload: article.body
      },
      {
        type: RESET_ARTICLE_HIGHLIGHT
      }
    ];

    store = mockStore({});

    return store
      .dispatch(
        actions.markHighlightSection({
          body: article.body,
          slug: data.slug,
          text: data.text,
          save: false
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectations);
      });
  });
});
