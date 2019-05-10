import "@babel/polyfill";
import axios from "../../utils/axios";
import { MARK_HIGHLIGHTED_SECTION } from "../actionTypes";
import { setEmptyLine } from "../../utils/helperFunctions";

export const markHighlightSection = (articleBody, text, save) => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const clonedSelection = range.cloneContents();
  const div = document.createElement("div");
  div.appendChild(clonedSelection);
  const highlightedText = div.innerHTML.toString();
  const regX = new RegExp(highlightedText, "gi");
  const newArticleBody = articleBody.replace(
    regX,
    `<span class="highlighted">${highlightedText}</span>`
  );
  return {
    type: MARK_HIGHLIGHTED_SECTION,
    payload: newArticleBody
  };
};
