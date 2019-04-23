import { combineReducers } from "redux";
import loginReducers from "./loginReducers";
import resetPasswordReducers from "./resetPasswordReducers";
import updatePasswordReducers from "./updatePasswordReducers";
import likeReducers from "./likeReducers";

export default combineReducers({
  login: loginReducers,
  resetPassword: resetPasswordReducers,
  updatePassword: updatePasswordReducers,
  like: likeReducers
});
