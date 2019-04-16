import axios from "axios";
import { nullRemover } from "../../helpers/helpers";
import {
  SET_PROFILE,
  SET_LOADING,
  SET_ERROR,
  SET_FORM_INPUT,
  SET_SUCCESS,
  SET_IMAGE
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
export const setImage = file => ({
  type: SET_IMAGE,
  payload: file
});
const token = process.env.TOKEN;
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
};
export const fetchCurrentUser = username => dispatch => {
  dispatch(setLoading(true));
  return axios
    .get(`${process.env.API_URL}/profiles/${username}`, {
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

export const saveUpdatedUser = (updatedProfile, username) => dispatch =>
  axios
    .put(
      `${process.env.API_URL}/profiles/${username}`,
      { profile: updatedProfile },
      config
    )
    .then(response => {
      const { profile, message } = response.data;
      dispatch(setCurrentUser(nullRemover(profile)));
      dispatch(setSuccess(message));
    })
    .catch(errorResponse => {
      const { error } = errorResponse.response.data;
      dispatch(setError(error));
    });

export const uploadImage = file => dispatch => {
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
      return response;
    })
    .catch(response => {
      dispatch(setError(response.message));
      return response.message;
    });
};
