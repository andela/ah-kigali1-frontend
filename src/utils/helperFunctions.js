import ReactHtmlParser from "react-html-parser";

import { filter, flatten, values, keyBy } from "lodash";
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

export const arrayToObject = (items, key) => keyBy(items, item => item[key]);

export const filterByTag = (items, tag) =>
  filter(items, item => item.tagsList.includes(tag));

export const getTags = items => [
  ...new Set(flatten([...values(items).map(item => item.tagsList)]))
];

export const isBottom = () =>
  window.innerHeight + document.documentElement.scrollTop ===
  document.documentElement.offsetHeight;
export const hasFocus = () => document.getElementById("nav-search-input");

export const containsSpecialChar = value => {
  const alphanumericRegex = /[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]/g;
  return alphanumericRegex.test(value);
};
