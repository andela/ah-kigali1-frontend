import "@babel/polyfill";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "../../utils/axios";
import { fetchAllArticles } from "../../redux/actions/readAllArticlesActions";
import {
  ALL_ARTICLES,
  ALL_ARTICLES_ERROR,
  FETCHING_ALL_ARTICLES
} from "../../redux/actionTypes";

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

const { API_URL } = process.env;
describe("fetching all articles", () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });

  test("should dispatch the fetch all articles action", async () => {
    const store = mockStore({});
    const actions = [
      {
        type: FETCHING_ALL_ARTICLES
      },
      {
        type: ALL_ARTICLES,
        payload: []
      }
    ];
    await moxios.stubRequest(`${API_URL}/articles`, {
      status: 200,
      response: {
        message: "Articles fetched successfully"
      }
    });

    store.dispatch(fetchAllArticles()).then(() => {
      expect(store.getActions()).toEqual(actions);
    });
  });

  test("should dispatch the fetch all error action", async () => {
    const store = mockStore({});
    const actions = [
      {
        type: FETCHING_ALL_ARTICLES
      },
      {
        type: ALL_ARTICLES_ERROR,
        payload: "Error fetching the articles"
      }
    ];
    await moxios.stubRequest(`${API_URL}/articles`, {
      status: 500,
      response: {
        message: "Error fetching the articles"
      }
    });

    store.dispatch(fetchAllArticles()).then(() => {
      expect(store.getActions()).toEqual(actions);
    });
  });
});
