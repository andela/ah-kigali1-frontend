import "@babel/polyfill";
import axios from "../../utils/axios";
import { nullRemover } from "../../helpers/helpers";
import {
  SET_PROFILE,
  SET_LOADING,
  SET_ERROR,
  SET_FORM_INPUT,
  SET_SUCCESS,
  SET_IMAGE,
  SET_INPUT,
  CLEAR_MESSAGE
} from "../actionTypes";

export const setCurrentUser = user => ({
  type: SET_PROFILE,
  payload: user
});

export const setLoading = status => ({
  type: SET_LOADING,
  payload: status
});

export const setError = error => ({
  type: SET_ERROR,
  payload: error
});
export const setSuccess = message => ({
  type: SET_SUCCESS,
  payload: message
});

export const handleFormInput = payload => ({
  type: SET_FORM_INPUT,
  payload
});
export const handleInput = payload => ({
  type: SET_INPUT,
  payload
});
export const setImage = file => ({
  type: SET_IMAGE,
  payload: file
});
export const clearMessages = payload => ({
  type: CLEAR_MESSAGE,
  payload
});

const token = localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
};
/**
 * @description make a promise in order to delay
 * reducer update until the field validations are done
 * @param {json} payload
 * @return {promise} to enable waiting time
 */
export const InputHandle = payload => dispatch =>
  new Promise(resolve => {
    dispatch(handleInput(payload));
    resolve(true);
  });
/**
 * @description fetch current user from db
 * @param {string} username
 * @returns {any} json object {response}
 */
export const fetchCurrentUser = username => dispatch => {
  dispatch(setLoading(true));
  return axios
    .get(`/profiles/${username}`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      const { profile } = response.data;
      dispatch(setCurrentUser(nullRemover(profile)));
      dispatch(setLoading(false));
    })
    .catch(error => {
      const { message } = error.response.data;
      dispatch(setError(message));
      dispatch(setLoading(false));
    });
};
/**
 * @description update users information
 * @param {json} updatedProfile
 * @returns {any} json object {response}
 */
export const saveUpdatedUser = updatedProfile => async dispatch => {
  const tokenAs = await localStorage.getItem("token");
  return axios
    .put(
      `/profiles/${updatedProfile.username}`,
      { profile: updatedProfile },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenAs}`
        }
      }
    )
    .then(response => {
      const { profile, message } = response.data;
      dispatch(setCurrentUser(nullRemover(profile)));
      dispatch(setSuccess(message));
      setTimeout(() => {
        dispatch(clearMessages({ field: "message", value: "" }));
      }, 5000);
    })
    .catch(errorResponse => {
      const { error } = errorResponse.response.data;
      dispatch(setError(error));
      setTimeout(() => {
        dispatch(clearMessages({ field: "error", value: "" }));
      }, 5000);
    });
};
/**
 * @description change users password
 * @param {json} updatedData
 * @param {string} username
 * @returns {any} json object {response}
 */
export const changePassword = (updatedData, username) => dispatch =>
  axios
    .put(`/users/password/${username}/change`, updatedData, config)
    .then(response => {
      const { message } = response.data;
      dispatch(setSuccess(message));
      setTimeout(() => {
        dispatch(clearMessages({ field: "message", value: "" }));
      }, 5000);
    })
    .catch(errorResponse => {
      const { message } = errorResponse.response.data;
      dispatch(setError(message));
      setTimeout(() => {
        dispatch(clearMessages({ field: "error", value: "" }));
      }, 5000);
    });

/**
 * @description delete user
 * @param {string} username
 * @returns {any} json object {response}
 */
export const deleteProfile = username => dispatch =>
  axios
    .delete(`/profiles/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const { message } = response.data;
      dispatch(setSuccess(message));
    })
    .catch(errorResponse => {
      const { message } = errorResponse.response.data;
      dispatch(setError(message));
    });

/**
 * @description Upload Image on Cloudinary
 * @param {file} file
 * @returns {any} return object contains public url
 */
export const uploadImage = file => dispatch => {
  dispatch(setLoading(true));
  const url = `${process.env.CLOUDINARY_URL}/${process.env.CLOUD_NAME}/upload`;
  const fd = new FormData();
  fd.append("upload_preset", process.env.UNSIGNED_UPLOAD_PRESET);
  fd.append("file", file);
  return fetch(url, {
    method: "POST",
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    },
    body: fd
  })
    .then(response => response.json())
    .then(response => {
      // eslint-disable-next-line camelcase
      const { secure_url } = response;
      dispatch(setImage(secure_url));
      dispatch(setLoading(false));
      setTimeout(() => {
        dispatch(clearMessages({ field: "message", value: "" }));
      }, 5000);
      return response;
    })
    .catch(response => {
      dispatch(setError(response.message));
      dispatch(setLoading(false));
      setTimeout(() => {
        dispatch(clearMessages({ field: "error", value: "" }));
      }, 5000);
      return response.message;
    });
};
