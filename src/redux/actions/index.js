import "@babel/polyfill";
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
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsInVzZXJuYW1lIjoidXNlcm5hbWUiLCJpZCI6ImNjNGZiNWNjLWVmNTQtNGY5ZS1iODE2LTg2MzM1NGEyNjliYiIsInJvbGVJZCI6IjcwNzBmMWY0LTI2ODYtNGU2Mi04NGViLTMzOThiZTJlZjU0NCIsImlhdCI6MTU1NDg2NzEwOH0.7hP-pDPNoDZ6E5wf30lFu-0uFsxkQUkHZ8hMdrqyhfE";
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
};
export const fetchCurrentUser = username => dispatch => {
  dispatch(setLoading(true));
  return axios
    .get(`http://localhost:4000/api/v1/profiles/${username}`, {
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

export const saveUpdatedUser = (updatedProfile, username) => dispatch => {
  axios.put('')
  // return axios
  //   .put(
  //     `http://localhost:4000/api/v1/profiles/${username}`,
  //     { profile: updatedProfile },
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`
  //       }
  //     }
  //   )
  //   .then(response => {
  //     console.log(response.config.data);
  //     // const { profile, message } = response.data;
  //     // dispatch(setCurrentUser(nullRemover(profile)));
  //     // dispatch(setSuccess(message));
  //   })
  //   .catch(errorResponse => {
  //     console.log("hello", errorResponse);
  //     // const { error } = errorResponse.response.data;
  //     // dispatch(setError(error));
  //     // setError(error);
  //   });
};

export const uploadImage = file => dispatch => {
  // const cloudName = process.env.CLOUD_NAME;
  // const unsignedUploadPreset = process.env.UNSIGNED_UPLOAD_PRESET;
  // const baseUrl = process.env.CLOUDINARY_URL;
  const url = "https://api.cloudinary.com/v1_1/dtzujn9pi/upload";
  const fd = new FormData();
  fd.append("upload_preset", "m2zsnlpc");
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
  // return axios
  //   .post(url, fd, {
  //     headers: { "X-Requested-With": "XMLHttpRequest" }
  //   })
  //   .then(res => {
  //     const { secure_url } = res.data;
  //     dispatch(setImage(secure_url));
  //   })
  //   .catch(err => {
  //     dispatch(setError(err));
  //   });
};
