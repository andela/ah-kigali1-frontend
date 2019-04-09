import { combineReducers } from "redux";
import loginReducers from "./authReducers";
import resetPasswordReducers from "./resetPasswordReducers";
import updatePasswordReducers from "./updatePasswordReducers";
import socialAuthReducers from "./socialAuthReducers";
import articleReducer from "./articleReducer";

export default combineReducers({
  auth: loginReducers,
  article: articleReducer,
  login: loginReducers,
  resetPassword: resetPasswordReducers,
  updatePassword: updatePasswordReducers,
  socialAuth: socialAuthReducers
});
