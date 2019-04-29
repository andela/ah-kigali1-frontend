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

export const isCurrentUserAuthor = (authorName, currentUser) => {
  if (currentUser && authorName === currentUser.username) {
    return true;
  }
  return false;
};
