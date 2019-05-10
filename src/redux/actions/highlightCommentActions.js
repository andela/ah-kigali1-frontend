import "@babel/polyfill";
import axios from "../../utils/axios";
import { MARK_HIGHLIGHTED_SECTION } from "../actionTypes";
import getSelectedNodes from "../../utils/highlightedNodes";

export const markHighlightSection = (articleBody, text, save) => {
  const textWithHighlight = getSelectedNodes();
  console.log(textWithHighlight);
  return {
    type: MARK_HIGHLIGHTED_SECTION
  };
};
