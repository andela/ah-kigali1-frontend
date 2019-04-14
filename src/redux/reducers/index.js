import { combineReducers } from "redux";
import loginReducers from "./loginReducers";
import userReducer from "./userReducer";

export default combineReducers({
  user: userReducer,
  login: loginReducers
});
