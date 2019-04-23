/**
 * @description global action creators
 */

export const REQUEST_SUBMITTED = "REQUEST_SUBMITTED";
export const REQUEST_FAILED = "REQUEST_FAILED";

export const ADD_ARTICLE = "ADD_ARTICLE";

export const LOGIN_INPUT_CHANGE = "HANDLE_LOGIN_TEXT_INPUT";
export const SUBMITTING_LOGIN_CREDENTIALS = "IS_SUBMITTING_LOGIN_CREDENTIALS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESSFULLY";
export const LOGIN_FAILED = "LOGIN_FAILED";

/**
 * @description reset password action creator
 */
export const RESET_PASSWORD_INPUT_CHANGE = "RESET_PASSWORD_INPUT_CHANGE";
export const SENDING_RESET_PASSWORD_LINK = "SENDING_RESET_PASSWORD_LINK";
export const RESET_PASSWORD_LINK_SUCCESS = "PASSWORD_RESET_LINK_SENT_SUCCESS";
export const RESET_PASSWORD_LINK_FAILED = "RESET_PASSWORD_LINK_FAILED";
export const UPDATE_PASSWORD_INPUT_CHANGE = "UPDATE_PASSWORD_INPUT_CHANGE";
export const UPDATING_PASSWORD = "UPDATING_PASSWORD";
export const PASSWORD_UPDATE_SUCCESS = "password_update_success";
export const PASSWORD_UPDATE_FAILED = "password_update_failed";

/**
 * @description like article action creators
 */
export const LIKE_ARTICLE = "LIKE_ARTICLE";
export const DISLIKE_ARTICLE = "DISLIKE_ARTICLE";
