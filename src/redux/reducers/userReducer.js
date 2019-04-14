import {
  SET_PROFILE,
  SET_LOADING,
  SET_ERROR,
  SET_FORM_INPUT,
  SET_SUCCESS,
  SET_IMAGE
} from "../actionTypes";

const initialState = {
  profile: {
    email: "",
    username: "",
    address: "",
    allowNotifications: true,
    bio: "",
    firstName: "",
    gender: "",
    image: "",
    lastName: "",
    password: "",
    phone: "",
    socialId: ""
  },
  loading: false,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PROFILE:
      return { ...state, profile: payload };
    case SET_LOADING:
      return { ...state, loading: payload };
    case SET_FORM_INPUT:
      return {
        ...state,
        profile: { ...state.profile, [payload.field]: payload.value }
      };
    case SET_ERROR:
      return { ...state, error: payload };
    case SET_SUCCESS:
      return { ...state, message: payload };
    case SET_IMAGE:
      return { ...state, profile: { ...state.profile, image: payload } };
    default:
      return state;
  }
};
