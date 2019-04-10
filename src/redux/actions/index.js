import { 
  SOME_ACTION,
  SET_PROFILE,
  SET_LOADING,
  SET_ERROR,
  SET_FORM_INPUT,
  SET_SUCCESS
} from "../actionTypes";

export const sampleActionCreator = () => {
  return {
    type: SOME_ACTION
  };
};

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

export const fetchCurrentUser = () => dispatch => {
  dispatch(setLoading(true));
  return fetch("http://localhost:4000/api/v1/profiles/username", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
      });
    })
    .then(data => {
      const { profile } = data;
      dispatch(setCurrentUser(profile));
      dispatch(setLoading(false));
    })
    .catch(error => {
      dispatch(setError(error.error));
      dispatch(setLoading(false));
    });
};
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsInVzZXJuYW1lIjoidXNlcm5hbWUiLCJpZCI6ImNjNGZiNWNjLWVmNTQtNGY5ZS1iODE2LTg2MzM1NGEyNjliYiIsInJvbGVJZCI6IjcwNzBmMWY0LTI2ODYtNGU2Mi04NGViLTMzOThiZTJlZjU0NCIsImlhdCI6MTU1NDgwMjAxNn0.nAvpaNeRdCJ4TQI8kHTsCkNIMtGrSDZjziptIrTI-38";
export const saveUpdatedUser = profile => dispatch => {
  dispatch(setLoading(true));
  console.log(profile);
  return fetch("http://localhost:4000/api/v1/profiles/username", {
    method: "PUT",
    body: JSON.stringify({ profile }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
      });
    })
    .then(data => {
      const { profile, message } = data;
      dispatch(setCurrentUser(profile));
      dispatch(setSuccess(message));
      dispatch(setLoading(false));
    })
    .catch(error => {
      dispatch(setError(error.error));
      dispatch(setLoading(false));
    });
};
