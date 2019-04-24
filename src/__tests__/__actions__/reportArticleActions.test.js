import moxios from "moxios";
import "@babel/polyfill";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import axios from "../../utils/axios";
import {
  reportedArticle,
  reportingArticle
} from "../../redux/actions/reportArticleActions";
import {
  ARTICLE_REPORTED,
  REPORT_ERROR,
  REPORTING_ARTICLE
} from "../../redux/actionTypes";

const { API_URL } = process.env;
const mockStore = configureMockStore([thunk]);

describe("report article actions creators", () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  test("should return reporting action type", () => {
    expect(reportingArticle()).toEqual({
      type: REPORTING_ARTICLE
    });
  });

  test("should return reporting and reported article actions", () => {
    const store = mockStore();
    const expectedActions = [
      {
        type: REPORTING_ARTICLE
      },
      {
        type: ARTICLE_REPORTED,
        payload: "Article reported successfully"
      }
    ];
    moxios.stubRequest(`${API_URL}/articles/hello-world/report`, {
      status: 201,
      response: "Article reported successfully"
    });
    return store
      .dispatch(reportedArticle("hello-world", "It violates human rights"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test("should return reporting and error actions", () => {
    const store = mockStore();
    const expectedActions = [
      {
        type: REPORTING_ARTICLE
      },
      {
        type: REPORT_ERROR,
        payload: "We are unable to authenticate you"
      }
    ];
    moxios.stubRequest(`${API_URL}/articles/hello-world/report`, {
      status: 401,
      response: {
        message: "We are unable to authenticate you"
      }
    });
    return store
      .dispatch(reportedArticle("hello-world", "It violates human rights"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
