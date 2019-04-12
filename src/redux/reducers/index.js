import { combineReducers } from "redux";
import loginReducers from "./loginReducers";
import resetPasswordReducers from "./resetPasswordReducers";

export default combineReducers({
  login: loginReducers,
  resetPassword: resetPasswordReducers
});
