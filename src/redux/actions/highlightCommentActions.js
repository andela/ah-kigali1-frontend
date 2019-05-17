import "@babel/polyfill";
import axios from "../../utils/axios";
import {
  UPDATE_BODY_WITH_HIGHLIGHT,
  SET_HIGHLIGHTED_SECTION,
  RESET_ARTICLE_HIGHLIGHT,
  SET_HIGHLIGHTS
} from "../actionTypes";
import { isEmpty, arrayToObject } from "../../utils/helperFunctions";
import { createComment } from "./commentActions";

export const fetchHighLights = slug => async dispatch => {
  try {
    const token = await localStorage.getItem("token");
    const {
      data: { highlights }
    } = await axios.get(`/articles/${slug}/highlights`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({
      type: SET_HIGHLIGHTS,
      payload: arrayToObject(highlights, "id")
    });
  } catch (error) {
    dispatch({
      type: RESET_ARTICLE_HIGHLIGHT
    });
  }
};

export const saveHighlight = ({
  text,
  slug,
  startIndex,
  endIndex,
  comment = ""
}) => async dispatch => {
  try {
    const token = await localStorage.getItem("token");
    const data = {};
    if (!isEmpty(comment)) data.comment = text;
    const {
      data: { highlight }
    } = await axios.post(
      `/articles/${slug}/highlights?start=${startIndex}&end=${endIndex}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const payload = { [highlight.id]: { ...highlight } };
    dispatch({
      type: SET_HIGHLIGHTS,
      payload
    });
    if (!isEmpty(comment)) {
      dispatch(createComment(comment, slug));
    }
  } catch (error) {
    dispatch({
      type: RESET_ARTICLE_HIGHLIGHT
    });
  }
};

export const markHighlightSection = ({
  body,
  slug,
  text,
  save
}) => async dispatch => {
  try {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const clonedSelection = range.cloneContents();
    const div = await document.createElement("div");
    div.appendChild(clonedSelection);
    const highlightedText = div.innerHTML.toString();
    let startIndex, endIndex, newArticleBody;
    if (body.indexOf(highlightedText) > 0) {
      startIndex = body.indexOf(highlightedText);
      endIndex = startIndex + (highlightedText.length - 1);
      newArticleBody = await body.replace(
        highlightedText,
        `<span class="highlighted">${highlightedText}</span>`
      );
    }

    dispatch({
      type: UPDATE_BODY_WITH_HIGHLIGHT,
      payload: newArticleBody || body
    });
    if (startIndex && endIndex) {
      dispatch({
        type: SET_HIGHLIGHTED_SECTION,
        payload: { start: startIndex, end: endIndex }
      });
    }
    if (save && startIndex && endIndex) {
      dispatch(saveHighlight({ text, slug, startIndex, endIndex }));
    }
  } catch (error) {
    dispatch({
      type: UPDATE_BODY_WITH_HIGHLIGHT,
      payload: body
    });
    dispatch({
      type: RESET_ARTICLE_HIGHLIGHT
    });
  }
};
