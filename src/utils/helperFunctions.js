import ReactHtmlParser from "react-html-parser";
import { flatten, isEqual } from "lodash";
import React from "react";
import { Redirect } from "react-router-dom";
import ErrorMessage from "../components/common/Message/error";
import SuccessMessage from "../components/common/Message/success";

/**
 * @description check if value is empty
 * @param {*} value - input to validate
 * @returns {boolean} -true or false
 */
export const isEmpty = value =>
  value === null ||
  value === undefined ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

/**
 * @description capitalize the initial letter
 * @param {string} string -string
 * @returns {string} capitalized string
 */
export const capitalize = string =>
  typeof string !== "string"
    ? string
    : `${string[0].toUpperCase()}${string.slice(1)}`;

export const parseURL = (parmName, parm) => parm.split(parmName)[1];

/**
 *
 * @param {string} authorName -The username of the author of the article
 * @param {object} currentUser -A user who is logged in
 * @returns {boolean} whether current user is the author of the article
 */

export const isCurrentUserAuthor = (authorName, currentUser) => {
  if (currentUser && authorName === currentUser.username) {
    return true;
  }
  return false;
};

/**
 *
 * @param {string} text - body of the article fetched from database
 * @returns {object} - the object containing the body of article, and background image of the article
 */

export const stringToHtmlElement = text => {
  const body = ReactHtmlParser(text);
  let firstImage = "https://picsum.photos/200/300/?random";
  const imageRegEx = /<img .*?>/g;

  const images = text.match(imageRegEx);
  if (images && images.length) {
    const oneImage = images[0].match(/src\s*=\s*"(.+?)"/);
    [firstImage, , ,] = oneImage[0].match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  }
  return { body, firstImage };
};

/**
 *
 * @param {string} time - Transform time from ISOString to DateString
 * @returns {string} - the time to DateString format.
 */

export const calculateTimeStamp = time => {
  const date = new Date(time);
  return date.toDateString();
};

/**
 * @description transforming Array into an Object with Key
 * @param {array} items - Array to be transformed into Object
 * @param {string} key - Attribute that should be object key
 * @returns {object} - an object with key value pair
 */
export const arrayToObject = (items = [], key = "id") =>
  items.reduce((itemsObj, item) => {
    itemsObj[item[key]] = item;
    return itemsObj;
  }, {});

/*
 * @param {array} items - array of items to be sorted
 * @param {string} tag - value for array to be filtered by
 * @returns {array} - an array with filtered articles
 */

export const values = (items = {}) => Object.values(items);
export const filterByTag = (items, tag) =>
  values(items).filter(item => item.tagsList.includes(tag));
/**
 *
 * @param {object} items - Object containing articles with tags.
 * @returns {array} - an array of unique tags
 */
export const getTags = items => [
  ...new Set(flatten([...values(items).map(item => item.tagsList)]))
];

/**
 * @description detect if user scrolled to the bottom
 * @returns {boolean} - true or false
 */
export const isBottom = () =>
  window.innerHeight + document.documentElement.scrollTop >=
  document.documentElement.offsetHeight;

/**
 * @description check if string contains a special character
 * @param {string} value - string
 * @returns {boolean} - true or false
 */
export const containsSpecialChar = value => {
  const alphanumericRegex = /[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]/g;
  return alphanumericRegex.test(value);
};

export const displayReportResponse = (reportError, reportSuccess) => {
  if (reportError) {
    return (
      <div>
        <ErrorMessage title={reportError} />
      </div>
    );
  }
  if (reportSuccess) {
    return (
      <div>
        <SuccessMessage title={reportSuccess} />
      </div>
    );
  }
};

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Redirect to="/sign_in" />;
  }
};
/**
 * @param {object} nextProps next props of an article to edit
 * @param {object} currentProps this.props of the article component
 */

export const checkNextProps = (nextProps, currentProps) => {
  if (isEqual(nextProps, currentProps)) {
    return false;
  }
  return true;
};
/**
 * @description - Get the highlighted text
 * @returns {string} - text
 */

export const getHighlightedText = () => window.getSelection().toString();

/**
 * @description - get location of highlighted text
 * @return {object} - Top and left
 */

export const getSelectedLocation = () => {
  const selection = window.getSelection(),
    range = selection.getRangeAt(0),
    refTop = range.getBoundingClientRect().top,
    refLeft = range.getBoundingClientRect().left;
  return {
    top: window.scrollY + refTop - 28,
    left: refLeft / 1.5 + 156
  };
};

/**
 * @description - highlight a highlighted text with different color
 */

export const customHighlightColor = highlightedText => {
  const range = window.getSelection().getRangeAt(0);
  const spanElement = document.createElement("span");
  spanElement.setAttribute("class", "highlighted");
  const textNode = highlightedText;
  spanElement.append(textNode);
  range.deleteContents();
  range.insertNode(spanElement);
};

/**
 * @description -check all html tags in highlighted text
 * @return {boolean} - true or false
 */

export const isHtmlTag = string => /<[a-z][\s\S]*>/i.test(string);

export const setEmptyLine = textWithTag => {
  const reg = new RegExp(`><`, "gi");
  return textWithTag.replace(reg, ">\n<");
};

/**
 * @description mark user highlight
 * @param {string} - body
 * @param {object} - highlights
 * @returns {string} - string
 */

export const markUserHighlight = (body, highlights = {}) => {
  try {
    let bodyWithHighlights = body;
    const sortedHighlights = Object.values(highlights).sort(
      (a, b) => b.highlightedText.length - a.highlightedText.length
    );
    sortedHighlights.forEach(highlight => {
      bodyWithHighlights = bodyWithHighlights.replace(
        highlight.highlightedText,
        `<span class="highlighted">${highlight.highlightedText}</span>`
      );
    });
    return bodyWithHighlights;
  } catch (error) {
    return body;
  }
};
