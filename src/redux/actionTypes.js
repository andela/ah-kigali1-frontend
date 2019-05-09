/**
 * @description global action creators
 */
export const REQUEST_SUBMITTED = "REQUEST_SUBMITTED";
export const REQUEST_FAILED = "REQUEST_FAILED";

export const ADD_ARTICLE = "ADD_ARTICLE";

/**
 * @description authentication actions
 */
export const LOGIN_INPUT_CHANGE = "HANDLE_LOGIN_TEXT_INPUT";
export const SUBMITTING_LOGIN_CREDENTIALS = "IS_SUBMITTING_LOGIN_CREDENTIALS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESSFULLY";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

/**
 * @description reset password action creator
 */
export const RESET_PASSWORD_INPUT_CHANGE = "RESET_PASSWORD_INPUT_CHANGE";
export const SENDING_RESET_PASSWORD_LINK = "SENDING_RESET_PASSWORD_LINK";
export const RESET_PASSWORD_LINK_SUCCESS = "PASSWORD_RESET_LINK_SENT_SUCCESS";
export const RESET_PASSWORD_LINK_FAILED = "RESET_PASSWORD_LINK_FAILED";
export const UPDATE_PASSWORD_INPUT_CHANGE = "UPDATE_PASSWORD_INPUT_CHANGE";
export const UPDATING_PASSWORD = "UPDATING_PASSWORD";
export const PASSWORD_UPDATE_SUCCESS = "PASSWORD_UPDATE_SUCCESS";
export const PASSWORD_UPDATE_FAILED = "PASSWORD_UPDATE_FAILED";

/**
 * @description social authentication
 */
export const CANCEL_SOCIAL_AUTH = "CANCEL_SOCIAL_AUTH";
export const IS_OPENING_SOCIAL_AUTH_PROVIDER = "IS_OPEN_SOCIAL_AUTH_PROVIDER";
export const SUBMITTING_SOCIAL_AUTH = "SUBMITTING_SOCIAL_AUTH";
export const SETTING_TOKEN_SOCIAL_AUTH = "SETTING_TOKEN_SOCIAL_AUTH";
export const SOCIAL_AUTH_SUCCESS = "SOCIAL_AUTH_SUCCESS";
export const SOCIAL_AUTH_FAILED = "SOCIAL_AUTH_FAILED";

/**
 * @description Creating article action types
 */
export const NEW_ARTICLE = "NEW_ARTICLE";
export const ARTICLE_ERROR = "ARTICLE_ERROR";
export const SUBMITTING_ARTICLE = "SUBMITTING_ARTICLE";
export const CLEAR_RESPONSE = "CLEAR_RESPONSE";

/**
 * @description edit article
 */
export const FETCH_ARTICLE_TO_EDIT = "FETCH_ARTICLE_TO_EDIT";
export const ARTICLE_UPDATED = "ARTICLE_UPDATED";

/**
 * @description fetch article action types
 */
export const ARTICLE_FETCHED = "FETCH_ARTICLE";
export const FETCHING_ARTICLE = "FETCHING_ARTICLE";
export const FETCHING_ASIDE_ARTICLES = "FETCHING_ASIDE_ARTICLES";

/**
 * @description delete article action types
 */
export const DELETE_ARTICLE = " DELETE_ARTICLE";

/**
 * @description profile actions
 */
export const SET_INPUT = "SET_INPUT";
export const SET_PROFILE = "SET_PROFILE";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const SET_FORM_INPUT = "SET_FORM_INPUT";
export const SET_SUCCESS = "SET_SUCCESS";
export const SET_IMAGE = "SET_IMAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

/**
 * @description search and filter action types
 */
export const SEARCHING_ARTICLES = "FETCHING_ARTICLE";
export const ARTICLE_SEARCH_SUCCESS = "ARTICLE_SEARCH_SUCCESSFULLY";
export const ARTICLE_SEARCH_FAILED = "ARTICLE_SEARCH_FAILED";
export const SEARCH_QUERY_CHANGE = "SEARCH_QUERY_CHANGE";
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";
export const SET_SUGGESTED_ARTICLES = "SET_SUGGESTED_ARTICLES";

/**
 * @description following action types
 */
export const FOLLOWING_SUCCESS = "FOLLOWING_SUCCESS";
export const WAITING_RESPONSE = "WAITING_RESPONSE";
export const FOLLOWING_FAILED = "FOLLOWING_FAILED";

/**
 * @description notification action types
 */
export const FETCHING_NOTIFICATION = "FETCHING_NOTIFICATION";
export const NOTIFICATION_SUCCESS = "NOTIFICATION_SUCCESS";
export const NOTIFICATION_FAILED = "NOTIFICATION_FAILED";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";

/**
 * @description report article
 */
export const ARTICLE_REPORTED = "ARTICLE_REPORTED";
export const REPORT_ERROR = "REPORT_ERROR ";
export const REPORTING_ARTICLE = "REPORTING_ARTICLE";
/**
 * @description registration action creator
 */
export const REGISTER_REQUESTED = "REGISTER_REQUESTED";
export const REGISTER_REQUEST_LOADING = "REGISTER_REQUEST_LOADING";
export const REGISTER_REQUEST_SUCCEEDED = "REGISTER_REQUEST_SUCCEEDED";
export const REGISTER_REQUEST_FAILED = "REGISTER_REQUEST_FAILED";
export const REGISTER_INPUT_CHANGE = "REGISTER_INPUT_CHANGE";
export const REGISTER_VALIDATE_INPUT = "REGISTER_VALIDATE_INPUT";

/**
 * @description comments on an article actions
 */
export const COMMENTS_INPUT = "COMMENTS_INPUT";
export const SET_SUCCESS_MESSAGE = "SET_SUCCESS_MESSAGE";
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE";
export const COMMENTS_INPUT_EDIT = "COMMENTS_INPUT_EDIT";
export const FETCHING_COMMENTS = "FETCHING_COMMENTS";
export const UPDATE_COMMENT_BODY = "UPDATE_COMMENT_BODY";
export const CLEAR_COMMENT_INPUT = "CLEAR_COMMENT_INPUT";
export const SET_LOADING_COMMENTS = "SET_LOADING_COMMENTS";
export const DELETE_COMMENT = " DELETE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const CREATE_NEW_COMMENT = "CREATE_NEW_COMMENT";

/**
 * @description like on comments actions
 */
export const CHANGE_LIKE = "CHANGE_LIKE";
/**
 * @description highlight and comment types
 */
export const UPDATE_BODY_WITH_HIGHLIGHT = "UPDATE_BODY_WITH_HIGHLIGHT";
export const SET_HIGHLIGHTED_SECTION = "SET_HIGHLIGHTED_TEXT";
export const RESET_ARTICLE_HIGHLIGHT = "RESET_ARTICLE_HIGHLIGHT";
export const SET_HIGHLIGHTS = "SET_HIGHLIGHTS";
export const MARK_HIGHLIGHTED_SECTION = "MARK_HIGHLIGHTED_TEXT";
/**
 * @description rate article action types
 */
export const RATING_ARTICLE = "RATING_ARTICLE";
export const RATING_FAILURE = "RATING_FAILURE";
export const RATING_SUCCESS = "RATING_FAILURE";
export const RATING_FOUND = "RATING_FOUND ";
/*
 * @description bookmark actions
 */

export const BOOKMARK_ARTICLE = "BOOKMARK_ARTICLE";
/**
 * @description All articles action types
 */
export const ALL_ARTICLES = "ALL_ARTICLES";
export const FETCHING_ALL_ARTICLES = "FETCHING_ALL_ARTICLES";
export const ALL_ARTICLES_ERROR = "ALL_ARTICLES_ERROR";
